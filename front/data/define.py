import os
import pandas as pd
import requests
import json 

df = pd.read_csv(os.path.join(r'full_requests2021.csv'))

# isolate groups from csv
groupsdf = df.groupby(by=['GROUP'], as_index=False).sum()
groups = groupsdf['GROUP'].values.tolist()

# isolate PROBLEMCODE by GROUP

finalobj = {}

for group in groups:
    finalobj[group] = {}
    filterdf = df.loc[df['GROUP'] == group].groupby(by=['PROBLEMCODE','DESCRIPTION'], as_index=False).sum()
    problems = filterdf['PROBLEMCODE'].values.tolist()
    for prob in problems:
        descdf = filterdf.loc[filterdf['PROBLEMCODE'] == prob].groupby(by=['DESCRIPTION'], as_index=False).sum()
        finalobj[group][prob] = descdf['DESCRIPTION'].values.tolist()[0]

file = open('dropdown.json', 'w')
json.dump(finalobj, file, indent=4)