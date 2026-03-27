# SaaS Code Grader

## Overview
The `domains/saas/graders/code_grader.py` file contains the deterministic SaaS code grader. This grader evaluates agent trajectories in SaaS tasks using heuristic-based scoring rules specific to each task difficulty level (easy, medium, hard), with optional database state verification for enhanced accuracy.

## Key Components

### Class: SaaSCodeGrader
Inherits from `BaseGrader` (from `server.interfaces`).

#### Methods:
- `grade(self, trajectory: list[dict], session) -> dict`: Main grading method that infers the task type and delegates to the appropriate grader.
  - Handles empty trajectory case
  - Infers task ID by examining tool calls and results for customer IDs, ticket IDs, and transaction IDs
  - Returns score, success flag, and feedback based on task-specific grading logic
  - Returns default failure response if task cannot be inferred

- `_infer_task(self, trajectory: Iterable[dict]) -> str | None`: Determines which SaaS task is being performed.
  - Concatenates tool names, arguments, and results from trajectory steps
  - Looks for specific identifiers to determine task difficulty:
    * Hard: C-9001, T-8001, T-8002, TX-9802
    * Medium: C-2077, T-5002, TX-9002
    * Easy: C-1042, T-5001, TX-5001
  - Returns None if no identifiers found

- `_has_step(self, trajectory: Iterable[dict], tool_name: str, **expected_args) -> bool`: Helper method to check if trajectory contains a specific tool call with expected arguments.
  - Iterates through trajectory steps
  - Returns True if finds step with matching tool_name and all expected arguments

- `_count_wrong_refunds(self, trajectory: Iterable[dict], valid_tx: str, customer_id: str) -> int`: Helper method to count incorrect refund attempts.
  - Counts issue_refund steps that don't match the valid transaction ID and customer ID

- `_score_result(self, score: float, success: bool, feedback: str) -> dict`: Helper method to format grading results.
  - Clamps score between 0.0 and 1.0, rounded to 4 decimal places
  - Returns dictionary with score, success, and feedback

- `_grade_easy(self, trajectory: list[dict], session) -> dict`: Grades the easy SaaS task.
  - Checks for account/ticket lookup for customer C-1042 (0.35 points)
  - Checks for closing ticket T-5001 (0.65 points)
  - Optional DB verification: ensures ticket is actually closed when session available
  - Success requires closing the correct ticket

- `_grade_medium(self, trajectory: list[dict], session) -> dict`: Grades the medium SaaS task.
  - Checks for account lookup or ticket search for customer C-2077 (0.15 points)
  - Checks for reviewing transactions for customer C-2077 (0.20 points)
  - Checks for refunding duplicate charge TX-9002 for customer C-2077 (0.35 points)
  - Checks for emailing customer C-2077 (0.15 points)
  - Checks for closing ticket T-5002 (0.15 points)
  - Penalizes incorrect refunds (-0.20 each)
  - Success requires proper refund and ticket closure
  - Optional DB verification: validates transaction and ticket status when session available

- `_grade_hard(self, trajectory: list[dict], session) -> dict`: Grades the hard SaaS task.
  - Checks for account review or VIP ticket search for customer C-9001 (0.15 points each)
  - Checks for transaction review for customer C-9001 (0.15 points)
  - Checks for refunding duplicate charge TX-9802 for customer C-9001 (0.20 points)
  - Checks for escalating ticket T-8001 to tier 2 (0.20 points)
  - Checks for emailing customer C-9001 (0.10 points)
  - Checks for closing billing ticket T-8002 (0.20 points)
  - Penalizes incorrect refunds (-0.20 each) and closing fraud ticket (-0.20 points)
  - Success requires proper refund, escalation, billing closure, and customer email
  - Optional DB verification: validates transaction status, ticket status/tiers, and email sending when session available

## Grading Logic Summary
- **Easy Task**: Focuses on basic ticket lookup and resolution for standard customer
- **Medium Task**: Requires duplicate charge identification, proper refund, customer communication, and ticket closure
- **Hard Task**: Involves VIP customer handling with fraud detection, proper escalation, billing resolution, and communication - all while avoiding incorrect actions

## Dependencies
- typing (Iterable)
- server.interfaces (BaseGrader)
- Local schema import (in verification steps): domains.saas.schema

## Usage
This grader is used by the SaaS domain to evaluate agent performance on SaaS-specific tasks. It combines trajectory-based heuristic scoring with optional database state verification for increased grading accuracy.