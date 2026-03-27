# HR Domain

## Overview
The HR domain (`domains/hr/domain.py`) implements the Human Resources domain for the MultiDomain environment. It extends the `BaseDomain` class and provides HR-specific functionality including tools, tasks, reward computation, and grading mechanisms.

## Key Components

### Class: HRDomain
Inherits from `BaseDomain` (from `server.interfaces`).

#### Methods:
- `create_tables(self, engine) -> None`: Creates database tables using SQLAlchemy's Base metadata, handling "already exists" errors gracefully.
- `seed_episode(self, task_id: str, session: Session) -> dict`: Seeds the environment for a specific task by calling the HR tasks seed function.
- `get_tools(self) -> dict[str, dict]`: Returns a dictionary of available HR tools with their argument schemas and implementation functions:
  - `lookup_policy`: Looks up HR policies
  - `get_employee_record`: Retrieves employee records
  - `check_leave_balance`: Checks employee leave balances
  - `file_leave_request`: Files a leave request
  - `get_benefits_summary`: Gets benefits summary information
  - `send_hr_notification`: Sends HR notifications
  - `close_hr_request`: Closes HR requests
- `get_tasks(self) -> list[dict]`: Returns the list of available HR tasks.
- `compute_step_reward(self, tool_name: str, tool_result: str, session: Session, step_count: int) -> float`: Computes rewards for each step based on the tool used and result:
  - Negative rewards (-0.05) for "not found", "error", or "insufficient" in results
  - Positive reward (0.40) for closing HR requests with "closed" in result
  - Positive reward (0.25) for filing leave requests with "reference number" in result
  - Positive reward (0.10) for sending HR notifications
  - Positive reward (0.05) for lookup operations (policy, employee record, leave balance, benefits)
  - Zero reward for all other actions
- `is_done(self, tool_name: str, tool_result: str, session: Session) -> bool`: Determines if the episode is complete (when HR request is closed).
- `get_graders(self) -> list[BaseGrader]`: Returns the graders used for this domain (HRCodeGrader and HRLLMGrader).
- `get_system_prompt_template(self) -> str`: Returns the system prompt template for HR tasks.

## Dependencies
- sqlalchemy
- domains.hr.schema
- domains.hr.graders (code_grader, llm_grader)
- domains.hr.prompts
- domains.hr.tasks
- domains.hr.tools (definitions, implementation)
- server.interfaces
- server.utils.db

## Usage
This domain is registered in the domain registry and can be used by specifying "hr" as the domain name when running baselines or evaluating agents.