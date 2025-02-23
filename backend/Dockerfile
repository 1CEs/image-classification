FROM python:3.10

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx

COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

EXPOSE 4321

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4321"]
