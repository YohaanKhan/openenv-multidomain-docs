# Models

## Overview
The `models.py` file defines the domain-agnostic Action and Observation types per the OpenEnv specification. These classes extend the base types from the OpenEnv core library to provide MultiDomain-specific functionality.

## Key Components

### EnvAction Class
Extends `Action` from `openenv.core.env_server.types`.

#### Attributes:
- `tool_name: str` - Name of the tool to invoke (required)
- `tool_args: dict` - Arguments validated against tool schema (defaults to empty dict)
- `thought: str` - Agent reasoning, logged but not executed (defaults to empty string)

### EnvObservation Class
Extends `Observation` from `openenv.core.env_server.types`.

#### Attributes:
- `content: str` - Tool result, error message, or initial task description (required)
- `done: bool` - True on terminal step (required)
- `reward: float` - Step reward. Negative for errors, positive for correct actions. (required)
- `info: dict` - Metadata containing step_count, task_id, trace_id. On terminal step: includes grader_score. (defaults to empty dict)

## Usage
These classes are used throughout the MultiDomain environment to standardize the interaction between agents and the environment. They ensure consistency in how actions are formulated and observations are interpreted across different domains.

## Dependencies
- openenv.core.env_server.types
- pydantic