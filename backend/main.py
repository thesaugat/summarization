from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from app.services.upload_service import handle_file_upload
from app.services.extract_service import extract_text_from_pdf
from app.services.preprocess_service import preprocess_and_save
from app.services.fetchpapers_service import fetch_all_papers, fetch_paper_by_id

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
