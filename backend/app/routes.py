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
        # Check saved results first
        saved_similarities = await similarity_collection.find({
            "source_paper_id": paper_id
        }).to_list(length=None)

        if saved_similarities:
            # Fetch additional paper details for saved results
            similar_papers = []
            for sim in saved_similarities:
                paper_details = await ml_result_collection.find_one(
                    {"file_id": sim["target_paper_id"]}
                )
                if paper_details:
                    authors_data = await ml_result_collection.find_one({"file_id": sim["target_paper_id"]})
                    similar_papers.append({
                        "paper_id": sim["target_paper_id"],
                        "title": paper_details["title"]["answer"],
                        "relevance_keywords": sim["keyword_similarity"],
                        "relevance_title": sim["title_similarity"],
                        "relevance_summary": sim["summary_similarity"],
                        "authors": authors_data["author"]["answer"]
                    })
            
            # Sort by average similarity
            similar_papers.sort(
                key=lambda x: (
                    x["relevance_keywords"] + x["relevance_title"] + x["relevance_summary"]
                )
                / 3,
                reverse=True,
            )
            return similar_papers

        # Get target paper details
        target_paper = await ml_result_collection.find_one({"file_id": paper_id})
        if not target_paper:
            raise HTTPException(status_code=404, detail="Paper not found")

        # Prepare target paper data
        target_data = {
            "keywords": target_paper["summary"]["keywords"]["answer"].split(", "),
            "title": target_paper["title"]["answer"],
            "summary": target_paper["summary"]["detailed_summary"]["answer"]
        }

        # Get all other papers
        all_papers = await ml_result_collection.find(
            {"file_id": {"$ne": paper_id}}
        ).to_list(length=None)

        # Prepare other papers data
        papers_data = [{
            "id": paper["file_id"],
            "keywords": paper["summary"]["keywords"]["answer"].split(", "),
            "title": paper["title"]["answer"],
            "summary": paper["summary"]["detailed_summary"]["answer"]
        } for paper in all_papers]

        # Call ML service to compute similarities
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "http://ml-service:5001/get-similarities",
                json={
                    "target_paper": target_data,
                    "papers_data": papers_data
                }
            ) as response:
                if response.status != 200:
                    raise HTTPException(
                        status_code=500,
                        detail="Error computing similarities"
                    )
                similarity_results = await response.json()

        # Round similarity percentage to 1 decimal places
        for similarity in similarity_results:
            # Convert similarity scores to percentage
            for key in ("relevance_title", "relevance_summary", "relevance_keywords"):
                similarity[key] = round(similarity[key] * 100, 1)
            # Add authors information
            authors_data = await ml_result_collection.find_one({"file_id": similarity["paper_id"]})
            similarity["authors"] = authors_data["author"]["answer"]

        # Save results to database
        similarity_docs = [
            PaperSimilarity(
                source_paper_id=paper_id,
                target_paper_id=result["paper_id"],
                keyword_similarity=result["relevance_keywords"],
                title_similarity=result["relevance_title"],
                summary_similarity=result["relevance_summary"],
            ).dict()
            for result in similarity_results
        ]
        if similarity_docs:
            await similarity_collection.insert_many(similarity_docs)

        # Sort by average similarity
        similarity_results.sort(
            key=lambda x: (
                x["relevance_keywords"] + x["relevance_title"] + x["relevance_summary"]
            )
            / 3,
            reverse=True,
        )

        return similarity_results

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))