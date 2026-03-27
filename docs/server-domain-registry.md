# Server Domain Registry

## Overview
The `server/domain_registry.py` file contains a minimal registry for registering and discovering domain plugins in the MultiDomain environment. It provides a singleton pattern for managing domain classes.

## Key Components

### Class: DomainRegistry
A singleton registry that maps domain names to domain classes.

#### Attributes:
- `_registry: dict[str, Type] = {}` - Private dictionary storing registered domains

#### Methods:
- `register(cls, name: str, domain_cls: Type) -> None`: 
  - Registers a domain under the provided name
  - Raises ValueError if the name is already registered to prevent duplicate imports
  
- `get(cls, name: str) -> Type | None`: 
  - Returns the domain class registered under `name`
  - Returns None if the domain is not found
  
- `list_domains(cls) -> list[str]`: 
  - Returns a sorted list of all registered domain names
  
- `require(cls, name: str) -> Type`: 
  - Returns the domain class or raises RuntimeError with helpful guidance
  - Error message includes requested name, available domains, and hint about registration
  - Used for mandatory domain retrieval where missing registration is a configuration error

## Usage
This registry is used throughout the MultiDomain system to:
- Register domain classes (HR, Legal, SaaS) during module initialization
- Retrieve domain classes by name for environment setup
- List available domains for API endpoints and CLI tools
- Ensure domains are properly registered before use

The registration happens implicitly when domain modules are imported, as each domain file calls `DomainRegistry.register()` with its domain name and class.

## Integration
- Used in `server/app.py` to get the startup domain and list available domains
- Used in `server/environment.py` to retrieve and require domain classes
- Each domain module (`domains/hr/domain.py`, `domains/legal/domain.py`, `domains/saas/domain.py`) registers itself during import

## Example Registration
In each domain's domain.py file:
```python
from server.domain_registry import DomainRegistry
# ... domain class definition ...
DomainRegistry.register("hr", HRDomain)  # or "legal", "saas"
```

## Dependencies
- None (self-contained implementation using standard Python typing)