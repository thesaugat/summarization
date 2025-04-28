from fastapi import FastAPI
from rag_summarizer import sumarize

app = FastAPI()


@app.get("/predict")
def predict():
    return {"prediction": sumarize("path")}
