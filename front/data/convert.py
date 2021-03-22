from os.path import exists
import json 
import pyproj

data = json.load(open(r'requests.json'))


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
    try:
        geojson['features'].append(
            {
                "type": "Feature",
                "geometry" : {
                    "type": "Point",
                    "coordinates": newCRS(d["LAT"], d["LONG"]),
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
                                'ADDRESS_ID': d['ADDRESS_ID']}
            }
        )
    except:
        print('failed to add item')

file = open('geojson.json', 'w')
json.dump(geojson, file)