from fastapi import FastAPI
from pydantic import BaseModel
import os

app = FastAPI()


class Input(BaseModel):
    message: str


@app.post("/predict")
def predict(input: Input):
    api_key = os.getenv("gem_api_key", "default_key")
    return {"response": f"Processed '{input.message}' with key {api_key}"}
