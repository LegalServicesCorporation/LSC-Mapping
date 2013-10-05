all: index.json

index.json: geojson/alabama.geojson geojson/alaska.geojson
	node bbox.js

geojson/alabama.geojson:
	ogr2ogr -f GeoJSON geojson/alabama.geojson Alabama\ \(statewide\)/Alabama\ counties\ clipped.shp

geojson/alaska.geojson:
	ogr2ogr -f GeoJSON geojson/alaska.geojson Alaska\ \(statewide\)/Alaska\ shp\ -\ clipped.shp
