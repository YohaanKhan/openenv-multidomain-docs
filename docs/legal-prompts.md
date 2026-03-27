# Legal Prompts

## Overview
The `domains/legal/prompts.py` file contains the system prompt template used for legal domain tasks. This template provides guidelines and instructions for agents operating in the legal contract review environment.

## Key Components

### SYSTEM_PROMPT_TEMPLATE
A multi-line string template that defines the agent's role and guidelines for legal assistance.

#### Content:
```
You are a junior legal assistant conducting contract reviews.
Your task is to identify non-standard clauses, assess risk, and produce a review memo.

Guidelines:
- Always retrieve the contract sections before drawing any conclusions
- Compare non-standard clauses against standard terms to understand the deviation
- Flag risks with the correct risk level: high for significant deviations, medium for moderate, low for minor
- Add a memo note for every material finding
- Do not give legal advice — describe what you observe
- Finalize the memo when the review is complete

Available tools:
{tool_docs}
```

#### Template Variables:
- `{tool_docs}`: Placeholder that gets replaced with documentation about available tools when the prompt is constructed

## Usage
This template is used by the legal domain to construct the system prompt that guides agent behavior. The template emphasizes:
1. Proper procedure (retrieving contract sections before conclusions)
2. Analysis (comparing clauses against standards)
3. Risk assessment (correctly labeling risk levels)
4. Documentation (adding memo notes for findings)
5. Professional boundaries (avoiding legal advice)
6. Completion (finalizing the review)

The `{tool_docs}` placeholder is replaced with actual tool descriptions when the domain constructs the final prompt for the agent.

## Dependencies
- None (self-contained string template)

## Integration
This template is imported and used in `domains/legal/domain.py` in the `get_system_prompt_template()` method, which returns it to be used by the environment when initializing agent sessions.