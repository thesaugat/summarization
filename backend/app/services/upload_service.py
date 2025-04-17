import os
import hashlib
from datetime import datetime
from fastapi import UploadFile, HTTPException
from app.database import get_mongo_collection

UPLOAD_DIR = "uploads/research_papers"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Ensure directory exists


async def handle_file_upload(file: UploadFile) -> dict:

    validate_file(file)

    file_content = await file.read()
    file_hash = calculate_file_hash(file_content)

    if await is_duplicate_file(file_hash):
        raise HTTPException(status_code=400, detail="Duplicate file detected.")

    file_path = save_file(file, file_content)
    metadata = create_metadata(file, file_path, file_hash)
    saved_metadata = await save_metadata_to_db(metadata)
    return saved_metadata


def validate_file(file: UploadFile):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")


def calculate_file_hash(file_content: bytes) -> str:
    sha256 = hashlib.sha256()
    sha256.update(file_content)
    return sha256.hexdigest()


async def is_duplicate_file(file_hash: str) -> bool:
    collection = get_mongo_collection("file_metadata")
    return await collection.find_one({"file_hash": file_hash}) is not None


def save_file(file: UploadFile, file_content: bytes) -> str:
    file_name = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    try:
        with open(file_path, "wb") as f:
            f.write(file_content)
        return file_path
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")


def create_metadata(file: UploadFile, file_path: str, file_hash: str) -> dict:
    return {
        "file_name": file.filename,
        "file_path": file_path,
        "file_hash": file_hash,
        "uploaded_at": datetime.now().isoformat(),
    }


async def save_metadata_to_db(metadata: dict) -> dict:
    try:
        collection = get_mongo_collection("file_metadata")
        result = await collection.insert_one(metadata)
        metadata["_id"] = str(result.inserted_id)
        return metadata
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save metadata: {e}")