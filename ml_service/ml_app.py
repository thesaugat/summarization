from fastapi import FastAPI

app = FastAPI()


@app.get("/predict")
def predict():
    return {"prediction": "Your ML model output here"}
