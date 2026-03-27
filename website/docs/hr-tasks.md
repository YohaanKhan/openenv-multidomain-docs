# HR Tasks

## Overview
The `domains/hr/tasks.py` file contains the task definitions and deterministic seed data for the HR domain. It defines three tasks of varying difficulty levels (easy, medium, hard) and provides functions to initialize the database state for each task.

## Key Components

### TASKS List
An array of task dictionaries, each defining an HR task:

#### hr_easy - Leave Entitlement Query
- **ID**: "hr_easy"
- **Name**: "Leave Entitlement Query"
- **Difficulty**: "easy"
- **Max Steps**: 5
- **Description**: New hire E-101 (Priya Sharma) wants to know their annual leave entitlement. Look up the annual leave policy and close the request with an explanation.

#### hr_medium - Leave Request Filing
- **ID**: "hr_medium"
- **Name**: "Leave Request Filing"
- **Difficulty**: "medium"
- **Max Steps**: 12
- **Description**: Employee E-202 (James Okafor) wants to take 5 days annual leave from 2024-07-15 to 2024-07-19. Check their leave balance (must be >= 5 days), file the request, notify their manager, then close the request.

#### hr_hard - Payroll Deduction Dispute
- **ID**: "hr_hard"
- **Name**: "Payroll Deduction Dispute"
- **Difficulty**: "hard"
- **Max Steps**: 18
- **Description**: Employee E-303 (Chen Wei) disputes an unexpected deduction from their salary. Look up the payroll deduction policy, retrieve their employee record, check their benefits to identify the deduction source, file a dispute request, then send a notification to E-303 that includes the request reference number. Finally close the dispute.

### seed() Function
Initializes the database with task-specific data.

#### Parameters:
- `task_id`: str - Identifier of the task to seed ("hr_easy", "hr_medium", or "hr_hard")
- `session`: Session - SQLAlchemy database session

#### Behavior:
- For hr_easy: Creates employee E-101 (Priya Sharma) and annual leave policy
- For hr_medium: Creates employee E-202 (James Okafor) with partial leave usage
- For hr_hard: Creates employee E-303 (Chen Wei), payroll policy, and pension benefit
- Calls session.flush() to persist changes
- Returns dictionary with task_id

## Usage
These tasks are used by the HR domain to provide standardized evaluation scenarios. The seed function ensures each task starts with a consistent initial state in the database, allowing fair comparison of agent performance across different runs.

## Dependencies
- sqlalchemy.orm (Session)
- domains.hr.schema (Employee, Policy, LeaveRequest, Benefit models)

## Integration
- Imported and used in `domains/hr/domain.py` for getting task list (`get_tasks()` method)
- Used by `domains/hr/domain.py` in `seed_episode()` method to initialize database state
- Referenced by `domains/hr/graders/code_grader.py` for task-specific grading logic