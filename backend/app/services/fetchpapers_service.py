from app.database import get_mongo_collection
from typing import List, Dict, Optional
from bson import ObjectId


def serialize_document(doc) -> Dict:
    doc["_id"] = str(doc["_id"])
    return doc

async def fetch_all_papers() -> List[Dict]:

    collection = get_mongo_collection("file_metadata")
    cursor = collection.find({}, {"extracted_text": 0})
    documents = await cursor.to_list(length=None)

    total = await collection.count_documents({})  # Count all documents

    serialized = [serialize_document(doc) for doc in documents]

    return {
        "total_count": total,
        "papers": serialized
    }

async def fetch_paper_by_id(file_id: str) -> Optional[Dict]:

    if not ObjectId.is_valid(file_id):
        return None

    collection = get_mongo_collection("file_metadata")
    document = await collection.find_one(
        {"_id": ObjectId(file_id)},
        {"extracted_text": 0} 
    )

    return serialize_document(document) if document else None