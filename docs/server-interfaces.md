# Server Interfaces

## Overview
The `server/interfaces.py` file defines the abstract base classes that define the contract between the MultiDomain environment engine and domain plugins. These interfaces ensure that all domains (HR, Legal, SaaS) implement the required functionality for the environment to drive them.

## Key Components

### Class: BaseDomain (Abstract Base Class)
Defines the contract that every domain plugin must satisfy before the engine can drive it.

#### Abstract Methods:
- `create_tables(self, engine) -> None`: 
  - Creates domain-specific SQLAlchemy tables using the provided engine
  - Invoked once during startup so the domain can define its own schema

- `seed_episode(self, task_id: str, session: Session) -> dict`: 
  - Seeds the database for the requested task and returns descriptive metadata
  - Returns a dictionary with at least {"description": str} that the engine shows to the agent

- `get_tools(self) -> dict[str, dict]`: 
  - Returns the tool registry for this domain
  - Each entry maps tool names to a dict containing "schema" (Pydantic schema class) and "func" (callable that executes the tool)

- `get_tasks(self) -> list[dict]`: 
  - Describes the domain's available tasks
  - Engine expects exactly three tasks (easy, medium, hard), each with id, name, difficulty, description, and max_steps keys

- `compute_step_reward(self, tool_name: str, tool_result: str, session: Session, step_count: int) -> float`: 
  - Shapes rewards per tool execution
  - Should return a float in [-0.5, 1.0]
  - Engine already applies penalties for invalid tools (-0.05) and bad args (-0.10), so this method focuses on domain semantics and progress toward completion

- `is_done(self, tool_name: str, tool_result: str, session: Session) -> bool`: 
  - Determines whether the current episode should end after the given tool run
  - Engine will also terminate when a task's max_steps is reached

- `get_graders(self) -> list[BaseGrader]`: 
  - Returns the graders that should evaluate final trajectories for this domain
  - Graders run only after an episode terminates and must be deterministic

- `get_system_prompt_template(self) -> str`: 
  - Provides the system prompt template that consumes `{tool_docs}`
  - The prompt builder renders the template with tool documentation gathered from domain's schemas

### Class: BaseGrader (Abstract Base Class)
Defines the deterministic grader interface for evaluating completed trajectories.

#### Abstract Method:
- `grade(self, trajectory: list[dict], session: Session | None) -> dict`: 
  - Scores the episode's trajectory while optionally using a DB session
  - Must return {"score": float, "success": bool, "feedback": str}
  - Grader needs to behave deterministically and handle session=None for /grader calls

## Usage
These interfaces are implemented by each domain:
- HR domain: `domains/hr/domain.py` (HRDomain class)
- Legal domain: `domains/legal/domain.py` (LegalDomain class)  
- SaaS domain: `domains/saas/domain.py` (SaaSDomain class)

And graders:
- HR graders: `domains/hr/graders/*_grader.py`
- Legal graders: `domains/legal/graders/*_grader.py`
- SaaS graders: `domains/saas/graders/*_grader.py`

The environment (`server/environment.py`) uses these interfaces to interact with domains without needing to know their specific implementations.

## Dependencies
- abc (ABC, abstractmethod)
- typing (Iterable)
- sqlalchemy.orm (Session)

## Integration
This file is imported by:
- `server/environment.py` - uses BaseDomain and BaseGrader
- Domain implementation files - inherit from BaseDomain
- Grader implementation files - inherit from BaseGrader