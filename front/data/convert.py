from os import getenv
import requests
import json 
import pyproj
from dotenv import load_dotenv


def update():
    env = load_dotenv(dotenv_path='../.env')

    def getData(key):
        url = f"https://www.stlouis-mo.gov/powernap/stlouis/api.cfm/requests.json?api_key={key}"
        print(url)
        return requests.get(url)

    data = getData(getenv('OPEN311_KEY')).text
    print(type(data))
    data = json.loads(data)

    def newCRS(long, lat):
        try:
            t = pyproj.Transformer.from_crs('esri:102696', 'epsg:4326')
            coor = t.transform(long, lat)
            return [coor[1], coor[0]]
        except:
            return [0, 0]

    geojson = {
        "type": "FeatureCollection",
        "features": [] 
    }


    for d in data:
        lat, long = newCRS(d["LAT"], d["LONG"])
        try:
            geojson['features'].append(
                {
                    "type": "Feature",
                    "geometry" : {
                        "type": "Point",
                        "coordinates": [lat, long],
                        },
                    "properties" : {'SERVICE_NAME': d['SERVICE_NAME'], 
                                    'REQUESTED_DATETIME': d['REQUESTED_DATETIME'], 
                                    'STATUS_NOTES': d['STATUS_NOTES'], 
                                    'ZIPCODE': d['ZIPCODE'], 
                                    'SERVICE_NOTICE': d['SERVICE_NOTICE'], 
                                    'UPDATED_DATETIME': d['UPDATED_DATETIME'], 
                                    'AGENCY_RESPONSIBLE': d['AGENCY_RESPONSIBLE'], 
                                    'STATUS': d['STATUS'], 
                                    'MEDIA_URL': d['MEDIA_URL'], 
                                    'DESCRIPTION': d['DESCRIPTION'], 
                                    'EXPECTED_DATETIME': d['EXPECTED_DATETIME'], 
                                    'ADDRESS': d['ADDRESS'], 
                                    'SERVICE_REQUEST_ID': d['SERVICE_REQUEST_ID'], 
                                    'ADDRESS_ID': d['ADDRESS_ID'],
                                    'lt': f'{lat}',
                                    'lng': f'{long}',
                                    'STREETVIEW': f"<a href='http://maps.google.com/maps?q=&layer=c&cbll={long},{lat}' target='blank'>Link</a>",
                                    'DIRECTIONS': f"<a href='http://maps.google.com/maps?daddr={long},{lat}' target='blank'>Link</a>",
                    }
                }
            )
        except:
            print('failed to add item')

    file = open('geojson.json', 'w')
    json.dump(geojson, file, indent=4)

update()