from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
import os

app = FastAPI()

# Define allowed origins for CORS (e.g., allow frontend from localhost)
origins = [
    "http://your-frontend-domain.com",  # Replace with actual domain when published
    "http://localhost:5173",
    "http://localhost",  # Allow localhost in general
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Can be ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (including Content-Type)
)


@app.on_event("startup")
async def startup():
    os.makedirs("uploaded", exist_ok=True)


app.include_router(router)
