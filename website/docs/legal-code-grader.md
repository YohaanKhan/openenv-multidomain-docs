# Legal Code Grader

## Overview
The `domains/legal/graders/code_grader.py` file contains the deterministic legal code grader. This grader evaluates agent trajectories in legal tasks using heuristic-based scoring rules specific to each task difficulty level (easy, medium, hard).

## Key Components

### Class: LegalCodeGrader
Inherits from `BaseGrader` (from `server.interfaces`).

#### Methods:
- `grade(self, trajectory: list[dict[str, Any]], session: Any) -> dict[str, Any]`: Main grading method that infers the task type and delegates to the appropriate grader.
  - Infers task ID by examining tool arguments for contract IDs (SA-001 for hard, VC-001 for medium, defaults to easy)
  - Returns score, success flag, and feedback based on task-specific grading logic
  - Returns default score of 0.5 with failure if task cannot be inferred

- `_infer_task(self, trajectory: list[dict[str, Any]]) -> str`: Determines which legal task is being performed.
  - Looks for contract ID "SA-001" in tool arguments to identify hard task
  - Looks for contract ID "VC-001" in tool arguments to identify medium task
  - Defaults to easy task if neither ID is found

- `_grade_easy(self, trajectory: list[dict[str, Any]]) -> dict[str, Any]`: Grades the easy legal task.
  - Awards 0.3 points for using either extract_clause or get_contract_section
  - Awards 0.3 points for using add_memo_note
  - Awards 0.4 points for using finalize_memo
  - Success requires using finalize_memo

- `_grade_medium(self, trajectory: list[dict[str, Any]], session: Any) -> dict[str, Any]`: Grades the medium legal task.
  - Checks for four tools with equal weights (0.25 each):
    * extract_clause
    * compare_clause
    * flag_risk
    * finalize_memo
  - Success requires both flag_risk and finalize_memo
  - Bonus 0.05 points if clause has non-none risk level and flag_risk was used (when session available)

- `_grade_hard(self, trajectory: list[dict[str, Any]], session: Any) -> dict[str, Any]`: Grades the hard legal task.
  - Awards points for:
    * Contract section extraction (2+ extract_clause or get_contract_section): 0.15
    * Multiple clause comparisons (2+ compare_clause): 0.20
    * High-risk flagging: 0.20
    * Medium-risk flagging: 0.20
    * Finalizing memo: 0.25
  - Success requires:
    * Both high and medium risk flags present
    * Finalize memo used
    * Specific contract clauses (SA-001 indemnity high risk, SA-001 liability medium risk) verified when session available

- `_flagged_with_level(self, trajectory: list[dict[str, Any]], level: str) -> bool`: Helper method to check if a specific risk level was flagged.
  - Looks for flag_risk steps with matching risk_level argument
  - Returns True if found, False otherwise

## Grading Logic Summary
- **Easy Task**: Focuses on basic contract examination and memo creation
- **Medium Task**: Requires clause extraction, comparison, risk flagging, and memo finalization
- **Hard Task**: Requires comprehensive contract analysis including multiple extractions, comparisons, dual-level risk flagging, and proper memo finalization with specific clause verification

## Dependencies
- typing (Any)
- domains.legal.schema
- server.interfaces (BaseGrader)

## Usage
This grader is used by the legal domain to evaluate agent performance on legal-specific tasks. It provides deterministic, interpretable scoring based on tool usage patterns and, when available, session data for verification.