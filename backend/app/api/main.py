from fastapi import FastAPI
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List


app = FastAPI()

client = MongoClient("mongodb://localhost:27017")
db = client["ehb_lectures"]

class Item(BaseModel):
    name: str
    code : str
    prerequisite : list
    credit : int
    type : str
    comp_or_elect : str
    semester : int


@app.get('/')
def index():
    return {"message": "Hello World"}   


@app.get("/items/", response_model=List[Item])
async def get_items():
    items = list(db['course_spy'].find({}, {"_id": 0}))
    return items
