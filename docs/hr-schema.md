# HR Schema

## Overview
The `domains/hr/schema.py` file defines the SQLAlchemy ORM schema for the HR domain. It shares the Base with the SaaS domain and defines tables for employees, policies, leave requests, and benefits.

## Key Components

### Base Import
- Imports `Base` from `server.utils.db` - shared with SaaS domain

### Employee Table
Represents employees in the HR system.

#### Columns:
- `id`: String, primary key
- `name`: String, not nullable
- `email`: String, not nullable
- `department`: String, not nullable, default="general"
- `role`: String, not nullable, default="employee"
- `annual_leave_days`: Integer, not nullable, default=20
- `leave_used`: Integer, not nullable, default=0
- `salary`: Float, not nullable, default=0.0

#### Relationships:
- `leave_requests`: One-to-many relationship with LeaveRequest (back_populates="employee")

### Policy Table
Represents HR policies.

#### Columns:
- `id`: String, primary key
- `topic`: String, not nullable
- `title`: String, not nullable
- `content`: Text, not nullable
- `version`: String, not nullable, default="1.0"

### LeaveRequest Table
Tracks employee leave requests.

#### Columns:
- `id`: Integer, primary key, autoincrement
- `ref_number`: String, not nullable, unique (reference number for tracking)
- `employee_id`: String, ForeignKey to hr_employees.id, not nullable
- `leave_type`: String, not nullable
- `start_date`: String, not nullable
- `end_date`: String, not nullable
- `days_requested`: Integer, not nullable
- `status`: String, not nullable, default="pending"
- `reason`: String, not nullable, default=""

#### Relationships:
- `employee`: Many-to-one relationship with Employee (back_populates="leave_requests")

### Benefit Table
Stores employee benefit information.

#### Columns:
- `id`: String, primary key
- `employee_id`: String, ForeignKey to hr_employees.id, not nullable
- `benefit_type`: String, not nullable
- `value`: Float, not nullable, default=0.0
- `description`: String, not nullable, default=""

## Usage
This schema is used by SQLAlchemy to create and manage the HR domain's database tables. The tables store persistent data about employees, their leave requests, company policies, and benefits information.

## Dependencies
- sqlalchemy (Column, String, Float, Integer, Text, Boolean, Date, ForeignKey, relationship)
- server.utils.db (Base)

## Integration
This schema is imported in `domains/hr/domain.py` and used by the `create_tables()` method to initialize the database schema when the environment starts.