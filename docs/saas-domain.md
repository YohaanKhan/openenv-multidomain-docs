# SaaS Domain

## Overview
The SaaS domain (`domains/saas/domain.py`) implements the Software-as-a-Service customer support domain for the MultiDomain environment. It extends the `BaseDomain` class and provides SaaS-specific functionality including tools, tasks, reward computation, and grading mechanisms.

## Key Components

### Class: SaaSDomain
Inherits from `BaseDomain` (from `server.interfaces`).

#### Methods:
- `create_tables(self, engine) -> None`: Creates database tables using SQLAlchemy's Base metadata, handling "already exists" errors gracefully.
- `seed_episode(self, task_id: str, session: Session) -> dict`: Seeds the environment for a specific task by calling the SaaS tasks seed function.
- `get_tools(self) -> dict[str, dict]`: Returns a dictionary of available SaaS tools with their argument schemas and implementation functions:
  - `search_tickets`: Searches for customer support tickets
  - `get_account`: Retrieves customer account information
  - `get_transactions`: Gets transaction history for an account
  - `issue_refund`: Issues refunds for transactions
  - `send_email`: Sends emails to customers
  - `escalate_ticket`: Escalates tickets to higher support tiers
  - `close_ticket`: Closes and resolves support tickets
- `get_tasks(self) -> list[dict]`: Returns the list of available SaaS tasks.
- `compute_step_reward(self, tool_name: str, tool_result: str, session: Session, step_count: int) -> float`: Computes rewards for each step based on the tool used and result:
  - Negative rewards (-0.05) for not found, empty results, or errors
  - Negative rewards (-0.10) for refund issues (wrong customer, already refunded, exceeds charge)
  - Positive reward (0.40) for closing tickets with "closed" in result
  - Positive reward (0.30) for issuing refunds with "refund issued" in result
  - Positive reward (0.25) for escalating tickets with "escalated" in result
  - Positive reward (0.10) for sending emails with "sent" in result
  - Positive reward (0.05) for search and account lookup
  - Positive reward (0.08) for getting transactions
  - Zero reward for all other actions
- `is_done(self, tool_name: str, tool_result: str, session: Session) -> bool`: Determines if the episode is complete (when ticket is closed).
- `get_graders(self) -> list[BaseGrader]`: Returns the graders used for this domain (SaaSCodeGrader and SaaSLLMGrader).
- `get_system_prompt_template(self) -> str`: Returns the system prompt template for SaaS tasks.

## Dependencies
- sqlalchemy
- domains.saas.schema
- domains.saas.graders (code_grader, llm_grader)
- domains.saas.prompts
- domains.saas.tasks
- domains.saas.tools (definitions, implementation)
- server.interfaces
- server.utils.db

## Usage
This domain is registered in the domain registry and can be used by specifying "saas" as the domain name when running baselines or evaluating agents.