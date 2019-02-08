import shapefile, sys, os

# read the shapefile

current_filepath_1 = sys.argv[0]
current_filepath_2 = os.path.abspath(__file__)
#print (current_filepath_2)

parent1 = os.path.dirname(os.path.abspath(__file__))
parent2 = os.path.dirname(os.path.abspath(sys.argv[0]))
#print (parent1)
#print (parent2)

#reader = shapefile.Reader("shp_to_gjson/short_data_map/short_data.shp")
#reader = shapefile.Reader("F:\\OSU\\Winter_2018\\CS_540\\project\\processed_data\\tx.shp")
print ("Input data: ")
print (parent1 + "\\shapefile\\sbs_wgs84.shp")
print ()
reader = shapefile.Reader(parent1 + "\shapefile\sbs_wgs84.shp")

fields = reader.fields[1:]
#print ("Fields: "); print (fields)
field_names = [field[0] for field in fields]
buffer = []
for sr in reader.shapeRecords():
    atr = dict(zip(field_names, sr.record))
    geom = sr.shape.__geo_interface__
    #buffer.append(dict(type="Feature", \
    #                   geometry=geom, properties=atr))
    buffer.append(dict(type="Feature", \
                       geometry=geom))

    # write the GeoJSON file
    #print ("Buffer: "); print (buffer)
    #print (insert) # no vale
    
from json import dumps

#geojson = open("pyshp-demo.json", "w")
#geojson = open("F:\\OSU\\Winter_2018\\CS_540\\project\\processed_data\\gjson\\tx.json", "w")
print ("Output file: ")
print (parent1 + "\\tual_3.js")
geojson = open(parent1 + "\\tual_3.js", "w")
geojson.write(dumps({"type": "FeatureCollection", \
                     "features": buffer}, indent=2) + "\n")
geojson.close()

print ()
print ("Geojson files was created.")
