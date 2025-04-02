# Project Name

This project is a full-stack application with a React frontend, FastAPI backend, a machine learning service, and a MongoDB database. The application is containerized using Docker and orchestrated with Docker Compose.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Running the Application](#running-the-application)
   - [Running All Containers](#running-all-containers)
   - [Running Individual Containers](#running-individual-containers)
3. [Container Overview](#container-overview)
   - [Frontend](#frontend)
   - [Backend](#backend)
   - [ML Service](#ml-service)
   - [MongoDB](#mongodb)
4. [Endpoints](#endpoints)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js** (optional, for local frontend development): [Install Node.js](https://nodejs.org/)
- **Python** (optional, for local backend development): [Install Python](https://www.python.org/downloads/)

---

## Running the Application

### Running All Containers

To run the entire application (frontend, backend, ML service, and MongoDB), use Docker Compose:

1. Clone the repository (if not already done):
   ```bash
   git clone <repository-url>
   cd <project-directory>
2. Navigate to frontend directory and install required packages
    ```bash
    cd frontend && npm install
3. cd back to project root and build and start all containers:
    ```bash
    cd ..
    docker-compose up --build
4. Access the application:

# Endpoints Overview

| Service       | URL                          | Description       |
|---------------|------------------------------|-------------------|
| Frontend      | http://localhost:3000/       | React App         |
| Backend (API) | http://localhost:8000/       | FastAPI           |
| ML Service    | http://localhost:5001/predict| ML Endpoint       |


### Running Individual Containers

If you want to run individual containers for development or debugging, follow these steps:

#### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
2. Navigate to frontend directory and install required packages (only if you have not installed before)
    ```bash
        npm install
3.  Build and run the frontend container:
    ```bash
    docker build -t frontend .
    docker run -p 3000:80 frontend

4. Access the frontend at http://localhost:3000.
