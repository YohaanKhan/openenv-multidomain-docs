# Legal Domain

## Overview
The Legal domain (`domains/legal/domain.py`) implements the legal contract review domain for the MultiDomain environment. It extends the `BaseDomain` class and provides legal-specific functionality including tools, tasks, reward computation, and grading mechanisms.

## Key Components

### Class: LegalDomain
Inherits from `BaseDomain` (from `server.interfaces`).

#### Methods:
- `create_tables(self, engine) -> None`: Creates database tables using SQLAlchemy's Base metadata, handling "already exists" errors gracefully.
- `seed_episode(self, task_id: str, session: Session) -> dict`: Seeds the environment for a specific task by calling the legal tasks seed function.
- `get_tools(self) -> dict[str, dict]`: Returns a dictionary of available legal tools with their argument schemas and implementation functions:
  - `get_contract_section`: Retrieves specific sections of a contract
  - `extract_clause`: Extracts particular clauses from contract text
  - `flag_risk`: Identifies and flags risky provisions in contracts
  - `get_standard_terms`: Gets standard contract terms for comparison
  - `compare_clause`: Compares contract clauses against standard terms
  - `add_memo_note`: Adds notes to a legal memo
  - `finalize_memo`: Finalizes and completes the legal review memo
- `get_tasks(self) -> list[dict]`: Returns the list of available legal tasks.
- `compute_step_reward(self, tool_name: str, tool_result: str, session: Session, step_count: int) -> float`: Computes rewards for each step based on the tool used and result:
  - Negative rewards (-0.05) for "not found" or "error" in results
  - Positive reward (0.40) for finalizing memos with "finalized" in result
  - Positive reward (0.20) for flagging risks with "flagged" in result
  - Positive reward (0.15) for comparing clauses
  - Positive reward (0.10) for adding memo notes with "added" in result
  - Positive reward (0.05) for lookup operations (contract section, clause extraction, standard terms)
  - Zero reward for all other actions
- `is_done(self, tool_name: str, tool_result: str, session: Session) -> bool`: Determines if the episode is complete (when memo is finalized).
- `get_graders(self) -> list[BaseGrader]`: Returns the graders used for this domain (LegalCodeGrader and LegalLLMGrader).
- `get_system_prompt_template(self) -> str`: Returns the system prompt template for legal tasks.

## Dependencies
- sqlalchemy
- domains.legal.schema
- domains.legal.graders (code_grader, llm_grader)
- domains.legal.prompts
- domains.legal.tasks
- domains.legal.tools (definitions, implementation)
- server.interfaces
- server.utils.db

## Usage
This domain is registered in the domain registry and can be used by specifying "legal" as the domain name when running baselines or evaluating agents.