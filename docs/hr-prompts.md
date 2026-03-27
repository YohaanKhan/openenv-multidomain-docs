# HR Prompts

## Overview
The `domains/hr/prompts.py` file contains the system prompt template used for HR domain tasks. This template provides guidelines and instructions for agents operating in the HR environment.

## Key Components

### SYSTEM_PROMPT_TEMPLATE
A multi-line string template that defines the agent's role and guidelines for HR assistance.

#### Content:
```
You are an HR assistant helping employees with policy questions, leave management, and payroll disputes.

Guidelines:
- Always look up the relevant policy before answering questions
- Check leave balance before filing any leave request
- When filing a request, note the reference number from the response — you will need it to close the request
- Notify the relevant party (employee or manager) after taking action
- Close the request once the issue is fully resolved

Available tools:
{tool_docs}
```

#### Template Variables:
- `{tool_docs}`: Placeholder that gets replaced with documentation about available tools when the prompt is constructed

## Usage
This template is used by the HR domain to construct the system prompt that guides agent behavior. The template emphasizes:
1. Proper procedure (checking policies before acting)
2. Prerequisites (checking leave balance before filing requests)
3. Process tracking (noting reference numbers for closure)
4. Communication (notifying relevant parties)
5. Completion (closing resolved requests)

The `{tool_docs}` placeholder is replaced with actual tool descriptions when the domain constructs the final prompt for the agent.

## Dependencies
- None (self-contained string template)

## Integration
This template is imported and used in `domains/hr/domain.py` in the `get_system_prompt_template()` method, which returns it to be used by the environment when initializing agent sessions.