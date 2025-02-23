from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics.nn.tasks import ClassificationModel
from pydantic import BaseModel
import uvicorn
import torch
import base64
import io
from PIL import Image
from ultralytics import YOLO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

torch.serialization.add_safe_globals([ClassificationModel])
type_model = YOLO("./models/type.pt")

class ImageRequest(BaseModel):
    image: str
    mode: str

@app.post("/classify")
def classify(request: ImageRequest):
    try:
        image_data = base64.b64decode(request.image)
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")
    
    results = type_model.predict(image)
    return {
        "predictions": results[0].to_json(),
        "info": {
            "classes": results[0].names,
            "image_info": {
                "path": results[0].path,
                "size": f"{results[0].orig_shape[0]}x{results[0].orig_shape[1]}"
            },
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=4321)
