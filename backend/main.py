from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from app.services.upload_service import handle_file_upload
from app.services.extract_service import extract_text_from_pdf
from app.services.preprocess_service import preprocess_and_save
from app.services.fetchpapers_service import fetch_all_papers, fetch_paper_by_id

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173"
]

# 🔹 Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload", tags=["File Upload"])
async def full_upload(file: UploadFile = File(...)):
    """
    Uploads file, extracts text, and preprocesses it in one combined operation.
    """
    try:
        # Upload and save metadata
        upload_result = await handle_file_upload(file)
        file_id = upload_result["_id"]

        # Extract PDF text and store it
        extract_result = await extract_text_from_pdf(ObjectId(file_id))
        if "error" in extract_result:
            raise HTTPException(status_code=500, detail=extract_result["error"])

        # Preprocess extracted text
        preprocess_result = await preprocess_and_save(file_id)
        if "error" in preprocess_result:
            raise HTTPException(status_code=500, detail=preprocess_result["error"])

        return {
            "file_id": file_id,
            "preprocessed_text": preprocess_result,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/fetch_papers", tags=["Fetch Papers"])
async def get_all_papers_route():
    try:
        papers = await fetch_all_papers()
        return papers
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/fetch_paper/{file_id}", tags=["Fetch Papers"])
async def get_one_paper_route(file_id: str):
    try:
        paper = await fetch_paper_by_id(file_id)
        if paper is None:
            raise HTTPException(status_code=404, detail="File not found or invalid ID")
        return paper
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
