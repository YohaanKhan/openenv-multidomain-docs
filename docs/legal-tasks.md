# Legal Tasks

## Overview
The `domains/legal/tasks.py` file contains the task definitions and deterministic seed data for the legal domain. It defines three tasks of varying difficulty levels (easy, medium, hard) and provides functions to initialize the database state for each task.

## Key Components

### TASKS List
An array of task dictionaries, each defining a legal task:

#### legal_easy - NDA Termination Clause Review
- **ID**: "legal_easy"
- **Name**: "NDA Termination Clause Review"
- **Difficulty**: "easy"
- **Max Steps**: 6
- **Description**: Review contract NDA-001. Extract the termination clause, add it to the memo under the 'termination' section, then finalize the memo.

#### legal_medium - Vendor Contract Payment Terms
- **ID**: "legal_medium"
- **Name**: "Vendor Contract Payment Terms"
- **Difficulty**: "medium"
- **Max Steps**: 12
- **Description**: Review vendor contract VC-001. Extract the payment terms clause, compare it against the standard payment terms, flag any deviation with the appropriate risk level, add a note to the memo about your finding, then finalize the memo.

#### legal_hard - SaaS Agreement Multi-Party Review
- **ID**: "legal_hard"
- **Name**: "SaaS Agreement Multi-Party Review"
- **Difficulty**: "hard"
- **Max Steps**: 20
- **Description**: Review SaaS agreement SA-001 (3 parties). Extract all clauses, identify the two non-standard clauses (indemnity and liability), compare each against standard terms, flag both with correct risk levels (indemnity=high, liability=medium), add memo notes for each finding, then finalize.

### seed() Function
Initializes the database with task-specific data.

#### Parameters:
- `task_id`: str - Identifier of the task to seed ("legal_easy", "legal_medium", or "legal_hard")
- `session`: Session - SQLAlchemy database session

#### Behavior:
- For legal_easy: Creates contract NDA-001 and termination clause (standard)
- For legal_medium: Creates contract VC-001, non-standard payment clause (90 days), and standard payment term (30 days)
- For legal_hard: Creates contract SA-001 with multiple clauses (confidentiality, obligations standard; indemnity, liability non-standard) and corresponding standard terms
- Calls session.flush() to persist changes
- Returns dictionary with task_id

## Usage
These tasks are used by the legal domain to provide standardized evaluation scenarios. The seed function ensures each task starts with a consistent initial state in the database, allowing fair comparison of agent performance across different runs.

## Dependencies
- sqlalchemy.orm (Session)
- domains.legal.schema (Contract, Clause, StandardTerm, MemoNote models)

## Integration
- Imported and used in `domains/legal/domain.py` for getting task list (`get_tasks()` method)
- Used by `domains/legal/domain.py` in `seed_episode()` method to initialize database state
- Referenced by `domains/legal/graders/code_grader.py` for task-specific grading logic