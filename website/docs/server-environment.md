# Server Environment

## Overview
The `server/environment.py` file contains the `MultiDomainEnvironment` class, which is the core engine that orchestrates domain plugins via the BaseDomain/graders interface. This environment drives the MultiDomain system by managing episodes, tool execution, reward computation, and grading.

## Key Components

### Class: MultiDomainEnvironment
Implements the `Environment` interface from `openenv.core.env_server.interfaces`.

#### Attributes:
- `SUPPORTS_CONCURRENT_SESSIONS: bool = True` - Indicates support for concurrent sessions
- `_domain_name`: Current domain name from environment variable (defaults to "saas")
- `_domain`: Instance of the current domain class
- `_tools`: Dictionary of available tools from the domain
- `_tasks`: List of available tasks from the domain
- `_system_prompt`: Built system prompt combining template and tool documentation
- `_tx`: TransactionManager for database operations
- `_state`: Current episode state
- `_trajectory`: List of steps taken in current episode
- `_task`: Current task being worked on
- `_episode_start_time`: Timestamp when episode started
- `_task_counter`: Counter for cycling through tasks

#### Methods:
- `__init__()`: Initializes the environment with domain setup, tool loading, and prompt building
- `reset() -> EnvObservation`: Resets environment, seeds next task, starts new episode
  - Rolls back previous episode, begins new savepoint
  - Selects next task in rotation
  - Seeds database with task-specific data
  - Builds initial observation with system prompt and task description
  - Updates metrics for episode start
- `step(self, action: EnvAction) -> EnvObservation`: Executes a tool action
  - Validates reset was called
  - Increments step count
  - Validates tool exists and arguments are correct
  - Executes tool function with validated arguments
  - Computes reward using domain's reward function
  - Checks if domain considers episode done
  - Records step in trajectory for graders and auditing
  - If done, runs graders and updates final metrics
  - Returns observation with result, done flag, reward, and info
- `_run_graders(session: Any) -> float`: Runs all domain graders and returns average score
- `_record_step(...)`: Appends step data to trajectory for grading and auditing
- `_build_info(...)`: Builds consistent metadata for observations
- `state` property: Exposes current episode state to OpenEnv clients

#### Metrics Tracking:
The environment tracks various metrics using Prometheus counters and histograms:
- `episodes_total`: Count of episodes by domain, task, and status
- `episode_duration`: Duration of episodes
- `grader_scores`: Scores from graders by domain, task, and difficulty
- `steps_total`: Tool usage by domain and tool name
- `tool_errors_total`: Tool errors by domain, tool name, and error type

#### Information Building:
The `_build_info` method creates consistent metadata included in every observation:
- Step count
- Task ID and difficulty
- Trace ID
- Domain name
- Error information (if present)
- Grader score and step limit hit (when done)

## Usage
This environment is used by the server app (`server/app.py`) to provide the HTTP interface for the MultiDomain system. It handles the core loop of resetting episodes, processing agent actions, computing rewards, and determining when tasks are complete.

## Dependencies
- openenv.core.env_server.interfaces (Environment)
- openenv.core.env_server.types (State)
- pydantic (ValidationError)
- Local modules: models (EnvAction, EnvObservation), domain_registry, system_prompt_builder, utils.db, utils.logger, utils.metrics
- Standard library: os, time, typing, uuid