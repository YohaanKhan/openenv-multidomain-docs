# Legal Tool Argument Schemas

## Overview
The `domains/legal/tools/definitions.py` file contains Pydantic-based argument schemas for all legal domain tools. These schemas define the expected input parameters for each tool, providing validation and documentation for agent interactions.

## Key Components

### GetContractSectionArgs
Schema for retrieving a named section or all clauses from a contract.

#### Fields:
- `contract_id: str` (required) - Contract ID (e.g., NDA-001)
- `section: str` (optional, default="all") - Clause type to retrieve, or 'all' for every clause

### ExtractClauseArgs
Schema for extracting a specific clause type from a contract for detailed review.

#### Fields:
- `contract_id: str` (required) - Contract ID
- `clause_type: str` (required) - Clause type: termination | payment | indemnity | liability | confidentiality | obligations

### FlagRiskArgs
Schema for flagging a clause as carrying legal risk for the memo.

#### Fields:
- `clause_id: str` (required) - Clause ID to flag (e.g., NDA-001-TERM)
- `risk_level: str` (required) - Risk level: low | medium | high
- `description: str` (required) - Description of the risk

### GetStandardTermsArgs
Schema for retrieving the standard template for a given clause type to use as a reference.

#### Fields:
- `clause_type: str` (required) - Clause type to get standard terms for

### CompareClauseArgs
Schema for comparing a contract clause against the standard terms for that clause type.

#### Fields:
- `clause_id: str` (required) - Clause ID from the contract
- `standard_clause_type: str` (required) - Clause type to compare against

### AddMemoNoteArgs
Schema for adding a note to the contract review memo under a named section.

#### Fields:
- `contract_id: str` (required) - Contract ID this note applies to
- `section: str` (required) - Memo section (e.g., termination, risk_summary, recommendations)
- `note: str` (required) - Note text to add

### FinalizeMemoArgs
Schema for finalizing the review memo and completing the contract review. Ends the episode.

#### Fields:
- `contract_id: str` (required) - Contract ID being finalized
- `summary: str` (required) - Executive summary of the review findings

## Usage
These schemas are used by the legal domain tools implementation to validate input parameters before executing tool functions. They ensure that agents provide correctly formatted arguments when invoking tools through the environment.

## Dependencies
- pydantic (BaseModel, Field)

## Integration
- Imported and used in `domains/legal/tools/implementation.py` for tool function signatures
- Imported and used in `domains/legal/domain.py` in the `get_tools()` method to provide tool schemas to the environment