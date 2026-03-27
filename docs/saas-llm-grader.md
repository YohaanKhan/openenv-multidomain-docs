# SaaS LLM Grader

## Overview
The `domains/saas/graders/llm_grader.py` file contains an LLM-based grader for the SaaS domain. This grader evaluates the quality of customer-facing emails sent by agents, providing a nuanced assessment of communication effectiveness in customer support scenarios.

## Key Components

### Class: SaaSLLMGrader
Inherits from `BaseGrader` (from `server.interfaces`).

#### Methods:
- `grade(self, trajectory: list[dict], session) -> dict`: Main grading method.
  - Finds the latest customer-facing email sent in the trajectory
  - Returns a neutral score (0.5) if no email is found (considering it acceptable to not send emails in some cases)
  - Returns a neutral score (0.5) if OpenAI API key is not available
  - Delegates to OpenAI's GPT model for actual email evaluation when API key is present
  - Returns score, success flag (based on score >= 0.5), and feedback

- `_find_latest_email(self, trajectory: Iterable[dict]) -> dict | None`: Helper method to find the most recent email sent.
  - Searches trajectory in reverse order
  - Returns the first step with tool_name "send_email"
  - Returns None if no email is found

## Grading Approach
Unlike the deterministic code grader, this grader evaluates the semantic quality of the actual customer-facing email sent by the agent. It assesses:
- Professionalism of tone
- Empathy toward customer situation
- Correctness in handling the request
- Helpfulness and clarity of communication

The LLM grader uses a specific prompt that asks the model to rate emails on a 0.0-1.0 scale where:
- 1.0 = professional, empathetic, and correctly handles the request
- 0.5 = adequate but generic
- 0.0 = rude, incorrect, or unhelpful

## Usage
This grader is used alongside the SaaSCodeGrader in the SaaS domain to provide both deterministic and LLM-based evaluation of agent performance. The LLM grader focuses specifically on the quality of communication in customer-facing emails, which is a critical aspect of SaaS customer support.

## Dependencies
- json
- os
- typing (Iterable)
- openai (imported locally within the grading method, handled gracefully if not available)
- server.interfaces (BaseGrader)

## Integration
This grader is imported and used in `domains/saas/domain.py` in the `get_graders()` method, where it's combined with the SaaSCodeGrader to provide comprehensive evaluation of agent performance on SaaS tasks.