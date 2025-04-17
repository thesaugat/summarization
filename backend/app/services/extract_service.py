import os
import fitz  # PyMuPDF
from bson import ObjectId
from app.database import get_mongo_collection


async def extract_text_from_pdf(file_id: ObjectId):
    """
    Extract text from a PDF using the file_path stored in MongoDB.
    """
    collection = get_mongo_collection("file_metadata")
    document = await collection.find_one({"_id": file_id})

    if not document or "file_path" not in document:
        return {"error": "No file found for the provided ID or file_path missing."}

    pdf_path = document["file_path"]
    if not os.path.exists(pdf_path):
        return {"error": f"File not found at path: {pdf_path}"}

    try:
        doc = fitz.open(pdf_path)
        extracted_text = [f"Page {i + 1}:\n{page.get_text('text')}\n" for i, page in enumerate(doc)]
        doc.close()

        result = await collection.update_one(
            {"_id": file_id},
            {"$set": {"extracted_text": extracted_text}}
        )

        if result.modified_count == 0:
            return {"error": "Failed to save extracted text to MongoDB."}

        return {
            "file_name": document.get("file_name", "Unknown"),
            "extracted_text": extracted_text
        }

    except Exception as e:
        return {"error": f"Error while extracting text: {str(e)}"}