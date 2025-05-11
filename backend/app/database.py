from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING
import os

MONGO_URL = os.getenv("MONGO_URL", "mongodb://mongo:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client["summarize_db"]

file_collection = db["uploaded_files"]
ml_result_collection = db["ml_results"]
similarity_collection = db["paper_similarities"]


async def setup_indexes():
    """Setup MongoDB indexes for collections"""
    # Create compound index for similarity collection
    await similarity_collection.create_index(
        [("source_paper_id", ASCENDING), ("target_paper_id", ASCENDING)], unique=True
    )
