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
# print (field_names)
#print (reader.shapeRecords())
ccc = 1
coord_data=[]#buffer = []
attrib_data=[]
for sr in reader.shapeRecords():
    # if ccc == 1: print ("sr.record*: ",sr.record); #ccc += 1

    attrib = dict(zip(field_names, sr.record))
    if ccc == 1: print ("Attributes: ",attrib)# It gives all the GRICODE, sub-basins, and Areas

    geom = sr.shape.__geo_interface__
    #WARNING#print (geom)# Print all the coordinates (it is HUGE)
    if ccc == 1: print (geom); #if ccc == 1: print (geom["coordinates"])
    # if ccc == 1: print (len(geom["coordinates"]))#print (type(geom["coordinates"]))
    # if ccc == 1: print (len(geom["coordinates"][0]))#It gives number of coordinates
    # if ccc == 1: print ((geom["coordinates"][0][0]))
    # if ccc == 1: print (type(geom))
    # if ccc == 1: print ("Length : %d" % len (geom))

    #buffer.append(dict(type="Feature", geometry=geom, properties=atr))
    #buffer.append(dict(type="Feature", geometry=geom))
    # buffer.append(dict(type="Feature", geometry=geom))
    coord_data.append(dict(type="Feature", geometry=geom))
    attrib_data.append(attrib)


    # write the GeoJSON file
    #print ("Buffer: "); print (buffer)
    #print (insert) # no vale
    ccc += 1

from json import dumps

#geojson = open("pyshp-demo.json", "w")
#geojson = open("F:\\OSU\\Winter_2018\\CS_540\\project\\processed_data\\gjson\\tx.json", "w")
print ("Output file: ")
print (parent1 + "\\mky3.js")# <-- YOU CAN CHANGE THE OUTPUT FILE-NAME
geojson = open(parent1 + "\\mky3.js", "w")# <-- YOU CAN CHANGE THE OUTPUT FILE-NAME
# geojson.write(dumps({"type": "FeatureCollection", "features": buffer}, indent=4) + "\n")
# geojson.write(dumps({"type": "FeatureCollection", "features": coord_data,"properties":attrib_data}, indent=4) + "\n") #Saved as geojson
geojson.write("var map_data = "+dumps({"type": "FeatureCollection", "features": coord_data,"properties":attrib_data}, indent=4) + "\n") #Saved as js
geojson.close()

print ()
print ("Geojson files was created.")
