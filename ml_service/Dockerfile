# Use Python base image
FROM python:3.10

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 5000
CMD ["uvicorn", "ml_app:app", "--host", "0.0.0.0", "--port", "5000"]