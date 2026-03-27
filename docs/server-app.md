# Server App

## Overview
The `server/app.py` file is the main entry point for the MultiDomain environment's web server. It creates a FastAPI application that provides HTTP endpoints for interacting with the environment, running baselines, grading trajectories, and accessing task information.

## Key Components

### Domain Initialization
- Attempts to import domains from the package or local module
- Gets the domain name from environment variable `DOMAIN` (defaults to "saas")
- Retrieves the domain class from the DomainRegistry
- Creates domain instance and initializes database tables on startup

### App Creation
- `_create_app()` function builds the FastAPI app using OpenEnv's `create_app` helper
- Configures the MultiDomainEnvironment, action/observation types, and environment name
- Sets maximum concurrent environments to 1
- Adds ProxyHeadersMiddleware to handle HTTPS redirects properly

### API Endpoints

#### GET `/tasks`
Returns information about available tasks for the configured domain.
- Requires domain to be registered
- Returns domain name, available domains, task list, and action schema

#### POST `/baseline`
Runs the OpenAI baseline agent for the configured domain.
- Imports and calls `run_baseline_all` from baseline.py
- Returns JSON response with baseline results
- Handles exceptions by returning 500 error with error message

#### POST `/grader`
Grades an agent trajectory using all graders for the configured domain.
- Accepts JSON payload with "trajectory" field
- Gets graders from the domain
- Runs each grader on the trajectory
- Averages scores from all graders
- Returns individual grader results and final score

#### GET `/health`
Health check endpoint.
- Returns status, current domain, and registered domains

#### GET `/metrics`
Returns Prometheus metrics from the environment.
- Gets metrics response from utils.metrics
- Returns Response with appropriate content type

#### Main Function
- Entry point for running the server via `python -m server.app`
- Parses host and port arguments (defaults to 0.0.0.0:7860)
- Runs uvicorn server

## Usage
This server provides the HTTP interface for the MultiDomain environment, allowing external systems to:
- Retrieve available tasks
- Run baseline agents for evaluation
- Submit agent trajectories for grading
- Monitor server health
- Access performance metrics

## Dependencies
- fastapi, uvicorn
- openenv.core.env_server.http_server
- Local modules: models, environment, domain_registry, utils.db, utils.metrics
- Environment variable: DOMAIN (defaults to "saas")