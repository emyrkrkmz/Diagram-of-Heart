from pymongo import MongoClient
from collections import defaultdict

client = MongoClient("mongodb://localhost:27017")
db = client["ehb_lectures"]
collection = db["elective_spy"]

def merge_electives():
    electives = list(collection.find())

    lenght = len(electives)
    
    i = 0
    while i < lenght - 1:
        j = i + 1
        while j < lenght:
            if electives[i]["name"] == electives[j]["name"]:
                electives[i]["course_list"].extend(electives[j]["course_list"])
                electives.pop(j)                
                lenght -= 1
            
            else:
                j += 1
        i += 1
        
    
    collection.delete_many({})
    collection.insert_many(electives)

    print("Electives merged successfully.")

# Run the merge function
merge_electives()
