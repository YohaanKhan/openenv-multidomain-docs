# SaaS Tool Argument Schemas

## Overview
The `domains/saas/tools/definitions.py` file contains Pydantic-based argument schemas for all SaaS domain tools. These schemas define the expected input parameters for each tool, providing validation and documentation for agent interactions.

## Key Components

### SearchTicketsArgs
Schema for searching support tickets by keyword with optional filters.

#### Fields:
- `query: str` (required) - Keyword to search in ticket title and body
- `customer_id: Optional[str]` (optional) - Filter by customer ID (e.g., C-1042)
- `status: Optional[str]` (optional) - Filter by status: open | closed | escalated
- `category: Optional[str]` (optional) - Filter by category: billing | access | fraud | downgrade

### GetAccountArgs
Schema for retrieving full account details for a customer including plan and VIP status.

#### Fields:
- `customer_id: str` (required) - Customer ID (e.g., C-1042)

### GetTransactionsArgs
Schema for listing all transactions for a customer account.

#### Fields:
- `customer_id: str` (required) - Customer ID to retrieve transactions for
- `limit: Optional[int]` (optional, default=10, ge=1, le=50) - Maximum number of most recent transactions to return

### IssueRefundArgs
Schema for issuing a monetary refund to a customer.

#### Fields:
- `customer_id: str` (required) - Customer ID to issue the refund to
- `transaction_id: str` (required) - Transaction ID to refund (e.g., TX-9001)
- `amount: float` (required) - Refund amount in USD (must be > 0 and cannot exceed original charge)
- `reason: str` (required) - Brief reason for issuing the refund

### SendEmailArgs
Schema for sending an email notification to a customer.

#### Fields:
- `customer_id: str` (required) - Customer ID to send the email to
- `subject: str` (required) - Email subject line
- `body: str` (required) - Full email body text

### EscalateTicketArgs
Schema for escalating a support ticket to a higher tier for specialist handling.

#### Fields:
- `ticket_id: str` (required) - Ticket ID to escalate (e.g., T-5001)
- `tier: int` (required, default=2, ge=2, le=3) - Target support tier: 2 or 3
- `reason: str` (required) - Reason for escalation

### CloseTicketArgs
Schema for marking a ticket as resolved and closing it.

#### Fields:
- `ticket_id: str` (required) - Ticket ID to close (e.g., T-5001)
- `resolution: str` (required) - Summary of how the issue was resolved

## Usage
These schemas are used by the SaaS domain tools implementation to validate input parameters before executing tool functions. They ensure that agents provide correctly formatted arguments when invoking tools through the environment.

## Dependencies
- typing (Optional)
- pydantic (BaseModel, Field)

## Integration
- Imported and used in `domains/saas/tools/implementation.py` for tool function signatures
- Imported and used in `domains/saas/domain.py` in the `get_tools()` method to provide tool schemas to the environment