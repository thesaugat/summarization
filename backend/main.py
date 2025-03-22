from fastapi import FastAPI
from pymongo import MongoClient
import os

app = FastAPI()

# MongoDB Connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://mongo:27017/")
client = MongoClient(MONGO_URL)
db = client.mydatabase


@app.get("/")
def read_root():
    return {"message": "FastAPI is running"}


@app.get("/data")
def get_data():
    return {"data": list(db.test_collection.find({}, {"_id": 0}))}
