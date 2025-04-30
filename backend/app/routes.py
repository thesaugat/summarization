from fastapi import APIRouter, UploadFile, File
from app.database import file_collection
from app.models import FileMeta
from datetime import datetime

import shutil
import uuid

router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    filename = f"{file_id}_{file.filename}"

    # Save file to disk (can be replaced with S3 or other)
    with open(f"uploaded/{filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Save metadata to MongoDB
    doc = FileMeta(file_name=filename, upload_date=datetime.utcnow())
    result = await file_collection.insert_one(doc.dict())

    return {"message": "File uploaded", "id": str(result.inserted_id)}
