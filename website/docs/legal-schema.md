# Legal Schema

## Overview
The `domains/legal/schema.py` file defines the SQLAlchemy ORM schema for the legal domain. It structures data around contracts, clauses, standard terms, and memo notes for contract review tasks.

## Key Components

### Base Import
- Imports `Base` from `server.utils.db`

### Contract Table
Represents legal contracts under review.

#### Columns:
- `id`: String, primary key
- `title`: String, not nullable
- `contract_type`: String, not nullable
- `parties`: String, not nullable
- `status`: String, not nullable, default="under_review"

#### Relationships:
- `clauses`: One-to-many relationship with Clause (back_populates="contract")
- `memos`: One-to-many relationship with MemoNote (back_populates="contract")

### Clause Table
Represents individual clauses within contracts.

#### Columns:
- `id`: String, primary key
- `contract_id`: String, ForeignKey to legal_contracts.id, not nullable
- `clause_type`: String, not nullable
- `party`: String, not nullable, default="all"
- `content`: Text, not nullable
- `is_standard`: Boolean, not nullable, default=True
- `risk_level`: String, not nullable, default="none"

#### Relationships:
- `contract`: Many-to-one relationship with Contract (back_populates="clauses")

### StandardTerm Table
Contains standard contract terms for comparison.

#### Columns:
- `id`: String, primary key
- `clause_type`: String, not nullable
- `content`: Text, not nullable
- `notes`: String, not nullable, default=""

### MemoNote Table
Stores notes added during contract review.

#### Columns:
- `id`: Integer, primary key, autoincrement
- `contract_id`: String, ForeignKey to legal_contracts.id, not nullable
- `section`: String, not nullable
- `note`: Text, not nullable

#### Relationships:
- `contract`: Many-to-one relationship with Contract (back_populates="memos")

## Usage
This schema is used by SQLAlchemy to create and manage the legal domain's database tables. It supports structured contract review by separating contracts into typed clauses, maintaining standard terms for comparison, and tracking review notes.

## Dependencies
- sqlalchemy (Column, String, Text, Boolean, Integer, ForeignKey, relationship)
- server.utils.db (Base)

## Integration
This schema is imported in `domains/legal/domain.py` and used by the `create_tables()` method to initialize the database schema when the environment starts.