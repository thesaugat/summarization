from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"

# Initialize MongoDB client
client = AsyncIOMotorClient(MONGO_URL)
db = client["iPaperDB"] 

def get_mongo_collection(collection_name: str):
    return db[collection_name]
