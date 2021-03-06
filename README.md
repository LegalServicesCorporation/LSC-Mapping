## Find Legal Aid

This is a mapping tool that allows users to enter a geographic location and return data based on that geography. In particular, it allows you to enter geo.json files so that the data it returns is geographically sensitive.

In this case, the LSC Map allows for end users to enter a location by zipcode, street address, or City,State and learn what LSC Funded organization provides free legal services for that location.

### About LSC & The creation of this tool
LSC funds civil legal help for low-income individuals on the basis of particular "service areas," 
which are defined on the basis of county, city, town, or other lines, as defined by Congress. LSC providers have 
locations within these services areas, and are only allowed to provide legal services within those areas. 
Therefore, it's important for low-income individuals to know which LSC locations can serve them (and, relatedly, 
which of those locations is closest to them).

The original LSC search tool only offered the ability to search on the basis of state and county. 
Because counties can be very large, and sometimes the LSC service areas are not drawn on a county basis, 
the search function is not as helpful as it can be (and in some cases leads to confusing results). 


## Setup

Requires OSX or Linux.

Install [GDAL](http://www.gdal.org/), [node.js](http://nodejs.org/).

    npm install
    make
    
### How to assemble a nationwide KML file from regional files: 
Create a new Fusion Table here http://www.google.com/drive/apps.html#fusiontables
Browse for regional file.
Click "Next" twice.
Name the file "lsc" and check the box for "allow export."
If there are more regional files to import, select File > Import More Rows. Repeat as necessary.
Select "Download." Choose "KML" as format.

### LSC Specific Data

Original (but dead) KML files: https://www.dropbox.com/sh/n75n32jmw11gfge/8VEY5ikG76

KML Data: lsntap.org/GIS_Data_GE_KML

Non LSC Specific Data:

We ultimately decided against using a Drupal module, and instead used the mapquest API (the MapBox API doesn't provide enough address geocoding). If you are committed to using a drupal mapping tool, see this:
Comparison of Drupal Mapping tools: https://drupal.org/node/1704948

Congressional district KML data: http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&ved=0CD0QFjAC&url=http%3A%2F%2Fwww.maps.ccgisc.org%2FKML%2FStateCongressionalDistricts.kmz&ei=pDBQUqf7Apaq4AOcrYHgBA&usg=AFQjCNHSqUnY4RPHLCOp9sUzBvnM7w2YAA&sig2=TX-xhthfYDTfA-dhvH1krA&bvm=bv.53537100,d.dmg

Zipcode Data: http://lsntap.org/GIS_Data_GE_Geocode
