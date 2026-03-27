# SaaS Tasks

## Overview
The `domains/saas/tasks.py` file contains the task definitions and deterministic seed data for the SaaS domain. It defines three tasks of varying difficulty levels (easy, medium, hard) and provides functions to initialize the database state for each task.

## Key Components

### TASKS List
An array of task dictionaries, each defining a SaaS task:

#### saas_easy - Billing Ticket Resolution
- **ID**: "saas_easy"
- **Name**: "Billing Ticket Resolution"
- **Difficulty**: "easy"
- **Max Steps**: 6
- **Description**: Customer C-1042 (Jane Smith at Northstar Design) has several historical support records, but only one currently open billing issue about an incorrect annual renewal charge. Find the correct open ticket for that customer and close it with a clear billing resolution.

#### saas_medium - Double Charge Refund
- **ID**: "saas_medium"
- **Name**: "Double Charge Refund"
- **Difficulty**: "medium"
- **Max Steps**: 12
- **Description**: Customer C-2077 (Bob Chen at LaunchLedger) reports a duplicate monthly subscription charge. Review the account and transaction history, refund only the duplicate November charge, send a confirmation email, then close the related billing ticket.

#### saas_hard - VIP Multi-Ticket Triage
- **ID**: "saas_hard"
- **Name**: "VIP Multi-Ticket Triage"
- **Difficulty**: "hard"
- **Max Steps**: 20
- **Description**: VIP enterprise customer C-9001 (Alice Corp) has multiple active issues. There is one urgent fraud-related billing concern that must be escalated, one duplicate charge that should be refunded, and one open billing ticket that can be closed after resolution. Review the account carefully, refund the correct duplicate transaction, escalate the urgent fraud ticket to Tier 2, close the resolved billing ticket, and send a customer update email.

### Helper Functions
- `_seed_customers(session: Session, customers: list[dict]) -> None`: Seeds customer records
- `_seed_tickets(session: Session, tickets: list[dict]) -> None`: Seeds support tickets
- `_seed_transactions(session: Session, transactions: list[dict]) -> None`: Seeds billing transactions

### seed() Function
Initializes the database with task-specific data.

#### Parameters:
- `task_id`: str - Identifier of the task to seed ("saas_easy", "saas_medium", or "saas_hard")
- `session`: Session - SQLAlchemy database session

#### Behavior:
- For saas_easy: Creates multiple customers (C-1042, C-1043, C-1100, C-1199), tickets (including T-5001 for the incorrect charge), and transactions (including TX-5001 for the $199 charge)
- For saas_medium: Creates customers (C-2077, C-2078, C-2088, C-2099), transactions (including duplicate TX-9001 and TX-9002 for November charges), and tickets (including T-5002 for the duplicate charge complaint)
- For saas_hard: Creates VIP customer C-9001 with is_vip=True, plus other customers, transactions (including duplicate TX-9802), and tickets (including urgent fraud ticket T-8001 and billing ticket T-8002)
- Calls session.flush() to persist changes
- Returns dictionary with task_id

## Usage
These tasks are used by the SaaS domain to provide standardized evaluation scenarios. The seed function ensures each task starts with a consistent initial state in the database, allowing fair comparison of agent performance across different runs.

## Dependencies
- sqlalchemy.orm (Session)
- domains.saas.schema (Customer, Ticket, Transaction, Email models)

## Integration
- Imported and used in `domains/saas/domain.py` for getting task list (`get_tasks()` method)
- Used by `domains/saas/domain.py` in `seed_episode()` method to initialize database state
- Referenced by `domains/saas/graders/code_grader.py` for task-specific grading logic