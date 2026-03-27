# Legal LLM Grader

## Overview
The `domains/legal/graders/llm_grader.py` file contains an LLM-based grader for legal tasks. This grader uses OpenAI's GPT models to evaluate the quality of legal memo notes added by agents, providing a more nuanced assessment than deterministic rules alone.

## Key Components

### Class: LegalLLMGrader
Inherits from `BaseGrader` (from `server.interfaces`).

#### Methods:
- `grade(self, trajectory: list[dict[str, Any]], session: Any) -> dict[str, Any]`: Main grading method.
  - Finds the last memo note added in the trajectory
  - Returns a default low score (0.3) if no memo note is found
  - Returns a neutral score (0.5) if OpenAI API is not available
  - Delegates to `_grade_with_openai` for actual LLM-based evaluation
  - Returns score, success flag, and feedback

- `_find_last_note(self, trajectory: list[dict[str, Any]]) -> dict[str, Any] | None`: Helper method to find the most recent memo note.
  - Searches trajectory in reverse order
  - Returns the first step with tool_name "add_memo_note"
  - Returns None if no memo note is found

- `_grade_with_openai(self, text: str) -> dict[str, Any]`: Performs the actual LLM-based grading.
  - Creates a prompt asking the model to rate the memo note on a 0.0-1.0 scale
  - Defines rating criteria:
    * 0.0 = vague
    * 1.0 = precise and actionable
  - Uses OpenAI's ChatCompletion API with gpt-4o-mini model
  - Requests JSON response format with score and reason
  - Clamps the score between 0.0 and 1.0
  - Returns score, success flag, and feedback (reason from LLM)
  - Handles API errors by returning a low score (0.4) with error message

## Grading Approach
Unlike the deterministic code grader, this grader evaluates the semantic quality of the actual legal memo note added by the agent. It assesses:
- Precision and specificity of the note
- Actionability of the feedback
- Clarity and usefulness for legal review purposes
- Relevance to the contract review task

## Dependencies
- json
- os
- typing (Any)
- openai (optional, handled gracefully if not available)
- server.interfaces (BaseGrader)

## Usage
This grader is used alongside the LegalCodeGrader in the legal domain to provide both deterministic and LLM-based evaluation of agent performance. The LLM grader focuses specifically on the quality of communication in legal memo notes.