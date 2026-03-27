# HR Tool Argument Schemas

## Overview
The `domains/hr/tools/definitions.py` file contains Pydantic-based argument schemas for all HR domain tools. These schemas define the expected input parameters for each tool, providing validation and documentation for agent interactions.

## Key Components

### LookupPolicyArgs
Schema for searching HR policy documents by topic keyword.

#### Fields:
- `topic: str` (required) - Policy topic to search (e.g., annual_leave, payroll, benefits, overtime)

### GetEmployeeRecordArgs
Schema for retrieving an employee's full record including leave balance and role.

#### Fields:
- `employee_id: str` (required) - Employee ID (e.g., E-101)

### CheckLeaveBalanceArgs
Schema for checking how many leave days an employee has available.

#### Fields:
- `employee_id: str` (required) - Employee ID to check
- `leave_type: str` (required) - Leave type: annual | sick | unpaid

### FileLeaveRequestArgs
Schema for filing a leave request for an employee. Returns a reference number on success.

#### Fields:
- `employee_id: str` (required) - Employee ID filing the request
- `leave_type: str` (required) - Leave type: annual | sick | unpaid
- `start_date: str` (required) - Start date in YYYY-MM-DD format
- `end_date: str` (required) - End date in YYYY-MM-DD format
- `days_requested: int` (required) - Number of working days requested (must be > 0)
- `reason: str` (optional, default="") - Optional reason for the request

### GetBenefitsSummaryArgs
Schema for retrieving a summary of all benefits for an employee.

#### Fields:
- `employee_id: str` (required) - Employee ID to get benefits for

### SendHRNotificationArgs
Schema for sending an HR notification to an employee or their manager.

#### Fields:
- `employee_id: str` (required) - Employee ID involved
- `recipient: str` (required) - Who to notify: employee | manager | hr_team
- `message: str` (required) - Notification message text

### CloseHRRequestArgs
Schema for closing and resolving an HR request or dispute. Ends the episode.

#### Fields:
- `request_ref: str` (required) - Reference number of the request (e.g., LR-2024-0042)
- `resolution: str` (required) - How the request was resolved

## Usage
These schemas are used by the HR domain tools implementation to validate input parameters before executing tool functions. They ensure that agents provide correctly formatted arguments when invoking tools through the environment.

## Dependencies
- pydantic (BaseModel, Field)

## Integration
- Imported and used in `domains/hr/tools/implementation.py` for tool function signatures
- Imported and used in `domains/hr/domain.py` in the `get_tools()` method to provide tool schemas to the environment