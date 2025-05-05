# Import Langchain modules
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import Chroma
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field

# Other modules and packages
import os
import tempfile
import streamlit as st
import pandas as pd


def predict():
    GENAI_API_KEY = os.getenv("gem_api_key", "default_key")
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-001", api_key=GENAI_API_KEY)
    resp = llm.invoke("Tell me a joke about Sky and plane").content
    return resp
