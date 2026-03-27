# Baseline Runner

## Overview
The `baseline.py` file contains the OpenAI API baseline runner for the multidomain OpenEnv environment. It provides functionality to run episodes using OpenAI's GPT models and evaluate their performance on various tasks across different domains.

## Key Components

### Functions

#### `_extract_text(response: Any) -> str`
Extracts the first assistant message text from a Chat Completions response.
Handles both string and list content formats from OpenAI API responses.

#### `_reset_for_task(env: Any, task_id: str, known_task_count: int) -> Any`
Resets the environment and aligns to the requested task when possible.
Accounts for the fact that the frozen server-side environment ignores `task_id` kwargs and rotates through tasks internally.

#### `run_episode(env: Any, client: OpenAI, task_id: str, max_turns: int = 30) -> float`
Runs a single episode for one task and returns the terminal grader score.
Implements the agent-environment interaction loop with a maximum number of turns.

#### `run_baseline_all(domain_name: str) -> dict[str, float]`
Runs one episode per task for the selected domain and returns task scores.
Handles API key validation, environment setup, and iteration through all tasks in a domain.

#### `_print_results(domain_name: str, scores: dict[str, float]) -> None`
Prints a compact results table with the average score for all tasks in a domain.

#### `main() -> None`
CLI entrypoint for running the OpenAI baseline.
Parses command-line arguments, runs the baseline, and prints results.

## Usage
```bash
python baseline.py --domain <domain_name>
```
Where `<domain_name>` can be one of: saas, hr, legal (as registered in the domain registry).

## Environment Variables
- `OPENAI_API_KEY`: Required for accessing OpenAI API
- `BASELINE_MODEL`: Defaults to "gpt-4o-mini" if not set
- `HF_SPACE_URL`: Defaults to "http://localhost:7860" if not set
- `DOMAIN`: Defaults to "saas" if not set

## Dependencies
- openai
- argparse
- json
- os
- typing
- Local modules: domains, client, models, server.domain_registry