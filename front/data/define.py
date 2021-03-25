from os import getenv
import pandas as pd
import requests
import json 

def defineCSV(csv):
    df = pd.read_csv(csv)
    
