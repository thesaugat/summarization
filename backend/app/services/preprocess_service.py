import re
from typing import List, Dict
from bson import ObjectId
from app.database import get_mongo_collection


async def preprocess_and_save(file_id: str):

    collection = get_mongo_collection("file_metadata")
    document = await collection.find_one({"_id": ObjectId(file_id)})

    if not document or "extracted_text" not in document:
        return {"error": "No extracted text found for this file ID."}

    preprocessed_text = preprocess_text(document["extracted_text"])

    result = await collection.update_one(
        {"_id": ObjectId(file_id)},
        {"$set": {"preprocessed_text": preprocessed_text}}
    )

    if result.modified_count == 0:
        return {"error": "Failed to save preprocessed text to MongoDB."}

    return preprocessed_text


def preprocess_text(extracted_text: List[str]) -> Dict[str, str]:

    cleaned_text = []
    for page in extracted_text:
        page = re.sub(r'-\s+', '', page)  # fix hyphenated words
        page = re.sub(r'\s+', ' ', page)  # normalize spaces
        cleaned_text.append(page.strip())

    full_text = " ".join(cleaned_text)


    first_page_lines = extracted_text[0].split("\n")
    title = next(
        (line.strip() for line in first_page_lines if line.strip() and not line.lower().startswith("page")),
        "Unknown Title"
    )

    # Date
    date_match = re.search(
        r"(Received\s+[A-Za-z]+\s+\d{1,2},\s+\d{4}\s*/\s*Revised\s+[A-Za-z]+\s+\d{1,2},\s+\d{4})",
        full_text,
        re.IGNORECASE
    )
    date = date_match.group(0) if date_match else "Unknown Date"

    # Abstract
    abstract_match = re.search(
        r"Abstract[:.]?\s*(.*?)(?=(?:\n{2,}|1\.|I\.|Introduction|Keywords|References|$))",
        full_text,
        re.IGNORECASE | re.DOTALL
    )
    abstract = abstract_match.group(1).strip() if abstract_match else "Abstract not found"

    return {
        "title": title,
        "date": date,
        "abstract": abstract
    }