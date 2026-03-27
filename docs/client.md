# Client Helpers

## Overview
The `client.py` file contains helper classes for interacting with the MultiDomain environment. It defines the `MultiDomainEnv` class which extends the base `EnvClient` from the OpenEnv core library.

## Key Components

### MultiDomainEnv Class
Extends `EnvClient[EnvAction, EnvObservation, dict]` from `openenv.core.env_client`.

#### Methods:
- `_step_payload(action: EnvAction) -> dict[str, Any]`: Converts the `EnvAction` into the payload expected by the server.
  - Extracts `tool_name`, `tool_args`, and `thought` from the action
  
- `_parse_result(data: dict[str, Any]) -> StepResult[EnvObservation]`: Parses the server response into an `EnvObservation` wrapped in `StepResult`.
  - Extracts observation payload and sets default values for reward, done, and info
  - Creates an `EnvObservation` from the payload
  - Wraps it in a `StepResult` with reward, done, and observation
  
- `_parse_state(data: dict[str, Any]) -> dict[str, Any]`: Returns the raw state payload.
  - Simply returns the input data as-is

## Usage
This class is used by the baseline runner and other components to interact with the MultiDomain environment server. It handles the translation between the environment's internal representation and the OpenEnv standard types.

## Dependencies
- openenv.core.env_client
- openenv.core.client_types
- Local models module (EnvAction, EnvObservation)