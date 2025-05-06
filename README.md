# iPpaer: Paper Summarization and Analysis

This project is a full-stack application with a React frontend, FastAPI backend, a machine learning service, and a MongoDB database. The application is containerized using Docker and orchestrated with Docker Compose.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Summarization Service - Function Documentation](#summarize)
3. [Running the Application](#running-the-application)
   - [Running All Containers](#running-all-containers)
   - [Running Individual Containers](#running-individual-containers)
4. [Container Overview](#container-overview)
   - [Frontend](#frontend)
   - [Backend](#backend)
   - [ML Service](#ml-service)
   - [MongoDB](#mongodb)
5. [Endpoints](#endpoints)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js** (optional, for local frontend development): [Install Node.js](https://nodejs.org/)
- **Python** (optional, for local backend development): [Install Python](https://www.python.org/downloads/)

---


## Summarization Service - Function Documentation

This document provides an overview of the functions implemented in the [`main.py`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py) file of the Summarization Service. Each function includes a brief description, along with its input and output parameters. Click on the function name to navigate directly to its implementation in the code.

---

## **Functions**

### **1. [`summarize(file: UploadFile)`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L39)**
- **Description**: 
  This is the main API endpoint that accepts a PDF file and returns a summarized output including the title, abstract, key points, and a detailed summary.
- **Inputs**:
  - `file` (UploadFile): The PDF file to be summarized.
- **Outputs**:
  - JSON object containing:
    - **`title`** (string): The extracted or generated title of the document.
    - **`abstract`** (string): Abstract of the document or "Not available" if not found.
    - **`key_points`** (list): Key points summarizing the document.
    - **`detailed_summary`** (string): A comprehensive summary of the document.

---

### **2. [`__init__(api_key: Optional[str] = None)`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L82)**
- **Description**: 
  Initializes the `EnhancedPDFSummarizer` class with Google Generative AI API credentials.
- **Inputs**:
  - `api_key` (string, optional): API key for Google Generative AI. Defaults to the environment variable `gem_api_key` or "default_key".
- **Outputs**: None.

---

### **3. [`load_and_split_pdf(file_path: str)`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L113)**
- **Description**: 
  Loads a PDF file and splits it into manageable chunks for processing.
- **Inputs**:
  - `file_path` (string): Path to the PDF file.
- **Outputs**:
  - `List[Document]`: A list of document chunks, with metadata preserved.

---

### **4. [`create_vectorstore(chunks: List[Document], vectorstore_path: str)`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L148)**
- **Description**: 
  Creates a vector store for document retrieval, ensuring unique chunks are stored.
- **Inputs**:
  - `chunks` (List[Document]): List of document chunks.
  - `vectorstore_path` (string): Path to store the vector database.
- **Outputs**:
  - `Chroma`: A Chroma vector store object.

---

### **5. [`extract_title(chunks: List[Document])`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L182)**
- **Description**: 
  Extracts the title from the document chunks using AI prompting.
- **Inputs**:
  - `chunks` (List[Document]): List of document chunks.
- **Outputs**:
  - `string`: Extracted title.

---

### **6. [`normalize_abstract_header(text: str)`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L219)**
- **Description**: 
  Normalizes headers such as "abstract" or "summary" in the document text.
- **Inputs**:
  - `text` (string): Text to process.
- **Outputs**:
  - `string`: Text with normalized headers.

---

### **7. [`generate_summary(retriever: BaseRetriever)`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L238)**
- **Description**: 
  Generates a comprehensive summary of a document by processing its chunks.
- **Inputs**:
  - `retriever` (BaseRetriever): Document retriever for fetching document chunks.
- **Outputs**:
  - `Dict[str, str]`: Dictionary with the following keys:
    - **`title`** (string): Title of the document.
    - **`abstract`** (string): Abstract of the document.
    - **`key_points`** (list): Key points extracted from the document.
    - **`detailed_summary`** (string): A comprehensive summary of the document.

---

### **8. [`summarize_file(file_path: str)`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L397)**
- **Description**: 
  Summarizes a PDF file and extracts key information like title, abstract, key points, and detailed summary.
- **Inputs**:
  - `file_path` (string): Path to the PDF file.
- **Outputs**:
  - `Dict[str, Any]`: Dictionary containing:
    - **`title`** (string): Title of the document.
    - **`summary`** (Dict): Summary information, including detailed summary, key points, and abstract.

---

### **9. [`embeddings` (Property)](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L104)**
- **Description**: 
  A property method that lazy-loads embeddings for vector operations to avoid unnecessary API calls.
- **Inputs**: None.
- **Outputs**:
  - `GoogleGenerativeAIEmbeddings`: Embedding instance for vector operations.


## Recommendation Service - Function Documentation

This document provides an overview of the functions implemented in the [`main.py`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py) file of the Recommendation Service. Each function includes a brief description, along with its input and output parameters. Click on the function name to navigate directly to its implementation in the code.

---

## **Functions**

### **1. [`compute_similarity(target_keywords: List[str], papers_keywords: Dict[str, List[str]])`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L460)**
- **Description**: 
  Utility function that implements BERT model using SentenceTransformer to calculate similarity between papers
  in the database based on keywords of the papers.
- **Inputs**:
  - `target_keywords` Keywords of the target paper
  - `papers_keywords` Dictionary of (paper_id -> keywords) for other papers
- **Outputs**:
  - List of tuples with paper id and similarity percentage to the target paper


### **2. [`get_similarities(target_keywords: List[str], papers_keywords: Dict[str, List[str]])`](https://github.com/thesaugat/summarization/blob/dev/ml-service/app/main.py#L499)**
- **Description**: 
  API implementation in ml service that takes keywords of papers and returns similarity score.
- **Inputs**:
  - `target_keywords` Keywords of the target paper
  - `papers_keywords` Dictionary of (paper_id -> keywords) for other papers
- **Outputs**:
  - List of tuples with paper id and similarity percentage to the target paper


### **3. [`get_similar_papers(paper_id: str)`](https://github.com/thesaugat/summarization/blob/dev/backend/app/routes.py#L87)**
- **Description**: 
  API route that takes a paper id, fetches it's keywords from database along with keywords of all other papers,
  calls *get_similarities* function with keywords and returns similarity percentage to papers.
- **Inputs**:
  - `paper_id` (str) id of the target paper
- **Outputs**:
  - JSON containing paper id, name and similarity percentage.

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
    docker run -p 5173:80 frontend

4. Access the frontend at http://localhost:5173.

### Endpoints Overview

| Service       | URL                          | Description       |
|---------------|------------------------------|-------------------|
| Frontend      | http://localhost:5173/       | React App         |
| Backend (API) | http://localhost:8000/       | FastAPI           |
| ML Service    | http://localhost:5001/| ML Endpoint       |