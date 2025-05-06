from fastapi import APIRouter, UploadFile, File
from app.database import file_collection
from app.models import FileMeta
from datetime import datetime
import aiohttp
from fastapi import HTTPException
import shutil
import uuid
from .models import FileMeta, MLResponse, PaperSimilarity
from .database import file_collection, ml_result_collection, similarity_collection

router = APIRouter()


# @router.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     file_id = str(uuid.uuid4())
#     filename = f"{file_id}_{file.filename}"
#     ml_data = None
#     file_path = f"uploaded/{filename}"

#     # Save file to disk (can be replaced with S3 or other)
#     with open(f"uploaded/{filename}", "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # Save metadata to MongoDB
#     doc = FileMeta(file_name=filename, upload_date=datetime.utcnow())
#     result = await file_collection.insert_one(doc.dict())
#     mongo_id = str(result.inserted_id)
#     # ml_service_url = "http://localhost:5001/predict"
#     # try:
#     #     async with aiohttp.ClientSession() as session:
#     #         with open(file_path, "rb") as f:
#     #             form = aiohttp.FormData()
#     #             form.add_field(
#     #                 "file", f, filename=filename, content_type="application/pdf"
#     #             )

#     #             async with session.post(ml_service_url, data=form) as ml_resp:
#     #                 if ml_resp.status != 200:
#     #                     raise Exception(f"ML service error: {ml_resp.status}")
#     #                 ml_data = await ml_resp.json()

#     #     # Store ML result in a separate collection
#     #     ml_doc = {"file_id": mongo_id, **ml_data}
#     #     await ml_result_collection.insert_one(ml_doc)

#     # except Exception as e:
#     #     return {"error": f"File uploaded but ML processing failed: {str(e)}"}

#     return {
#         "message": "File uploaded",
#         "id": str(result.inserted_id),
#         "ml_result": ml_data,
#     }


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    filename = f"{file_id}_{file.filename}"
    file_path = f"uploaded/{filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    doc = FileMeta(file_name=filename, upload_date=datetime.utcnow())
    result = await file_collection.insert_one(doc.dict())
    mongo_id = str(result.inserted_id)

    ml_service_url = "http://ml-service:5001/predict"
    try:
        async with aiohttp.ClientSession() as session:
            with open(file_path, "rb") as f:
                form = aiohttp.FormData()
                form.add_field(
                    "file", f, filename=filename, content_type="application/pdf"
                )
                async with session.post(ml_service_url, data=form) as ml_resp:
                    if ml_resp.status != 200:
                        raise Exception(f"ML service error: {ml_resp.status}")
                    ml_data_raw = await ml_resp.json()

        # Add file_id and timestamp
        ml_data_raw["file_id"] = mongo_id
        ml_data_raw["processed_at"] = datetime.utcnow().isoformat()

        # Validate structure using Pydantic model
        validated_data = MLResponse(**ml_data_raw)

        await ml_result_collection.insert_one(validated_data.dict())

    except Exception as e:
        return {"error": f"File uploaded but ML processing failed: {str(e)}"}

    return {
        "file_name": filename,
        "id": mongo_id,
        "ml_result": validated_data.dict(),
    }


@router.get("/files")
async def list_files():
    files = []
    async for file in file_collection.find():
        files.append(
            {"id": str(file["_id"]), "filename": file.get("filename", "Unknown")}
        )
    return {"files": files}


@router.get("/files-list")
async def list_files_with_summaries():
    try:
        files_cursor = await file_collection.find().to_list(length=None)
        results = []
        for file_doc in files_cursor:
            file_id_str = str(file_doc["_id"])
            summary = await ml_result_collection.find_one({"file_id": file_id_str})
            if summary:
                summary["_id"] = str(summary["_id"])
            file_doc["_id"] = file_id_str
            file_doc["ml_result"] = summary
            results.append(file_doc)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@router.get("/similar-papers/{paper_id}")
async def get_similar_papers(paper_id: str):
    try:
        # Check cache first
        cached_similarities = await similarity_collection.find({
            "source_paper_id": paper_id
        }).to_list(length=None)

        if cached_similarities:
            # Return cached results if found
            return {
                "papers": [
                    {
                        "paper_id": sim["target_paper_id"],
                        "similarity": sim["similarity_score"]
                    }
                    for sim in cached_similarities
                ]
            }

        # Get target paper's keywords
        target_paper = await ml_result_collection.find_one({"file_id": paper_id})
        if not target_paper:
            raise HTTPException(status_code=404, detail="Paper not found")

        # Get target paper's keywords
        target_keywords = target_paper["summary"]["keywords"]["answer"].split(", ")

        # Get all other papers' keywords
        all_papers = await ml_result_collection.find(
            {"file_id": {"$ne": paper_id}}
        ).to_list(length=None)

        papers_keywords = {
            paper["file_id"]: paper["summary"]["keywords"]["answer"].split(", ")
            for paper in all_papers
        }

        # Call ML service to compute similarities
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "http://ml-service:5001/compute-similarities",
                json={
                    "target_keywords": target_keywords,
                    "papers_keywords": papers_keywords
                }
            ) as response:
                if response.status != 200:
                    raise HTTPException(
                        status_code=500,
                        detail="Error computing similarities"
                    )
                similarity_results = await response.json()

        # Save results to cache
        similarity_docs = [
            PaperSimilarity(
                source_paper_id=paper_id,
                target_paper_id=result["paper_id"],
                similarity_score=result["similarity"]
            ).dict()
            for result in similarity_results["similarities"]
        ]
        if similarity_docs:
            await similarity_collection.insert_many(similarity_docs)

        return similarity_results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))