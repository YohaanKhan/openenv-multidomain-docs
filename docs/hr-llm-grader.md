# HR LLM Grader

## Overview
The `domains/hr/graders/llm_grader.py` file contains an LLM-based grader for HR tasks. This grader uses OpenAI's GPT models to evaluate the quality of HR notifications sent by agents, providing a more nuanced assessment than deterministic rules alone.

## Key Components

### Class: HRLLMGrader
Inherits from `BaseGrader` (from `server.interfaces`).

#### Methods:
- `grade(self, trajectory: list[dict[str, Any]], session: Any) -> dict[str, Any]`: Main grading method.
  - Finds the last HR notification sent in the trajectory
  - Returns a default low score (0.3) if no notification is found
  - Returns a neutral score (0.5) if OpenAI API is not available
  - Delegates to `_grade_with_openai` for actual LLM-based evaluation
  - Returns score, success flag, and feedback

- `_find_last_notification(self, trajectory: list[dict[str, Any]]) -> dict[str, Any] | None`: Helper method to find the most recent HR notification.
  - Searches trajectory in reverse order
  - Returns the first step with tool_name "send_hr_notification"
  - Returns None if no notification is found

- `_grade_with_openai(self, text: str) -> dict[str, Any]`: Performs the actual LLM-based grading.
  - Creates a prompt asking the model to rate the notification on a 0.0-1.0 scale
  - Defines rating criteria:
    * 1.0 = professional, empathetic, resolves the employee's concern
    * 0.5 = adequate but generic
    * 0.0 = unprofessional or incorrect
  - Uses OpenAI's ChatCompletion API with gpt-4o-mini model
  - Requests JSON response format with score and reason
  - Clamps the score between 0.0 and 1.0
  - Returns score, success flag, and feedback (reason from LLM)
  - Handles API errors by returning a low score (0.4) with error message

## Grading Approach
Unlike the deterministic code grader, this grader evaluates the semantic quality of the actual HR notification message sent by the agent. It assesses:
- Professionalism
- Empathy
- Effectiveness in addressing employee concerns
- Completeness and correctness of information

## Dependencies
- json
- os
- typing (Any)
- openai (optional, handled gracefully if not available)
- server.interfaces (BaseGrader)

## Usage
This grader is used alongside the HRCodeGrader in the HR domain to provide both deterministic and LLM-based evaluation of agent performance. The LLM grader focuses specifically on the quality of communication in HR notifications.