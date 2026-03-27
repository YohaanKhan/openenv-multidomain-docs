# HR Code Grader

## Overview
The `domains/hr/graders/code_grader.py` file contains the deterministic HR code grader. This grader evaluates agent trajectories in HR tasks using heuristic-based scoring rules specific to each task difficulty level (easy, medium, hard).

## Key Components

### Class: HRCodeGrader
Inherits from `BaseGrader` (from `server.interfaces`).

#### Methods:
- `grade(self, trajectory: list[dict[str, Any]], session: Any) -> dict[str, Any]`: Main grading method that infers the task type and delegates to the appropriate grader.
  - Infers task ID by examining tool arguments for employee IDs (E-303 for hard, E-202 for medium, defaults to easy)
  - Returns score, success flag, and feedback based on task-specific grading logic
  - Returns default score of 0.5 with failure if task cannot be inferred

- `_infer_task(self, trajectory: list[dict[str, Any]]) -> str`: Determines which HR task is being performed.
  - Looks for employee ID "E-303" in tool arguments to identify hard task
  - Looks for employee ID "E-202" in tool arguments to identify medium task
  - Defaults to easy task if neither ID is found

- `_grade_easy(self, trajectory: list[dict[str, Any]]) -> dict[str, Any]`: Grades the easy HR task.
  - Awards 0.4 points for using lookup_policy
  - Awards 0.6 points for using close_hr_request
  - Success requires using close_hr_request

- `_grade_medium(self, trajectory: list[dict[str, Any]]) -> dict[str, Any]`: Grades the medium HR task.
  - Checks for four tools with equal weights (0.25 each):
    * check_leave_balance
    * file_leave_request
    * send_hr_notification
    * close_hr_request
  - Success requires both file_leave_request and close_hr_request

- `_grade_hard(self, trajectory: list[dict[str, Any]]) -> dict[str, Any]`: Grades the hard HR task.
  - Awards points for using specific tools:
    * lookup_policy: 0.15
    * get_employee_record: 0.15
    * get_benefits_summary: 0.20
    * file_leave_request or tools containing "dispute": 0.20
    * Properly closing HR request with correct reference: 0.30
  - Success requires proper HR request closure with matching reference AND using file_leave_request

- `_extract_leave_ref(self, trajectory: list[dict[str, Any]]) -> str | None`: Helper method to extract leave request reference numbers from trajectory.
  - Looks for file_leave_request steps
  - Extracts text after "Reference number:" marker in the result
  - Returns the cleaned reference string or None if not found

## Grading Logic Summary
- **Easy Task**: Focuses on policy lookup and request closure
- **Medium Task**: Requires leave balance check, leave filing, notification, and closure
- **Hard Task**: Requires employee lookup, policy check, benefits summary, leave filing, and proper closure with reference matching

## Dependencies
- server.interfaces (BaseGrader)
- typing (Any)

## Usage
This grader is used by the HR domain to evaluate agent performance on HR-specific tasks. It provides deterministic, interpretable scoring based on tool usage patterns.