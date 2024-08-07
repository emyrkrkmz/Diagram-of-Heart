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
    
class Elective(BaseModel):
    name: str
    course_list : list
    semester : int


@app.get('/')
def index():
    return {"message": "Hello World"}   


@app.get("/courses/", response_model=List[Item])
async def get_items():
    items = list(db['course_spy'].find({}, {"_id": 0}))
    return items

@app.get("/electives/", response_model=List[Elective])
async def get_electives():
    items = list(db['elective_spy'].find({}, {"_id": 0}))
    return items
