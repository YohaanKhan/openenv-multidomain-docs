# System Prompt Builder

## Overview
The `server/system_prompt_builder.py` file contains the `SystemPromptBuilder` class, which is responsible for building system prompts from tool schema documentation for domain environments. It combines domain-specific prompt templates with automatically generated tool documentation to create the final system prompt that guides agent behavior.

## Key Components

### JSON_INSTRUCTION Constant
A multi-line string that instructs the agent on the required response format:
- Must respond ONLY with a valid JSON object
- Format: {"tool_name": "<name>", "tool_args": {<args>}, "thought": "<your reasoning>"}
- No text outside the JSON object is allowed

### Class: SystemPromptBuilder
A helper class for rendering tool schemas into system prompt text.

#### Static Method:
- `build(template: str, tools: dict[str, dict[str, Any]]) -> str`: 
  - Fills `{tool_docs}` in the template with markdown generated from tool schemas
  - Raises ValueError when the placeholder is missing
  - Process:
    1. Validates that template includes `{tool_docs}` placeholder
    2. For each tool in the tools dictionary:
       - Extracts the tool's schema (Pydantic model)
       - Gets the schema's docstring as description
       - Creates a header for the tool section (`### \`tool_name\` [description]`)
       - Iterates through schema fields to create documentation:
         * Field name and type annotation
         * Required/optional status
         * Field description (if available)
         * Default value (if not required and has default)
    3. Joins all tool sections with double newlines
    4. Formats the template with the generated tool documentation
    5. Appends the JSON_INSTRUCTION constant
    6. Returns the completed system prompt

## Usage
This builder is used by the MultiDomain environment to construct the system prompt that is presented to agents at the start of each episode. It combines:
1. The domain-specific system prompt template (from domains/*/prompts.py)
2. Automatically generated documentation for all available tools in that domain
3. The required JSON response format instructions

## Integration
- Used in `server/environment.py` in the `__init__` method to build `self._system_prompt`
- Takes the template from `self._domain.get_system_prompt_template()`
- Takes the tools from `self._domain.get_tools()`

## Dependencies
- typing (Any, Iterable)
- No external dependencies beyond standard library

## Example Output
For a tool like `lookup_policy` in the HR domain, the generated documentation would look like:
```
### `lookup_policy`
Search HR policy documents by topic keyword.

- **topic** (str) — required; Policy topic to search e.g. annual_leave, payroll, benefits, overtime
```