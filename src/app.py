from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/data")
def get_data():
    df = pd.read_csv("data/wikipedia_scraper.csv", header=None)
    data ={}
    current_date = None
    current_category = None
    for index, row in df.iterrows():
        value = str(row[0]).strip()

        if re.match(r"^\d{4}-\d{2}-\d{2}$", value):
            current_date = value
            data[current_date] = {"itn":[], "tfa": [], "dyk": [], "otd": []}
            current_category = None
        elif value in ["itn","tfa","dyk","otd"]:
            current_category = value
        elif current_date and current_category and value != "":
            data[current_date][current_category].append(value)
       
    return data


    
