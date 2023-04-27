# Sensor Management and Search

This is a very basic CRUD action UI for sensors.

A sensor has:
1. a unique id number, 
2. a string name, 
3. a list of string tags, 
4. a latitude and longitude location that is stored as a *GeoJSON Point* value (basic GIS Point vector in standardized JSON format)

On page load, a list of sensors is mocked out and can be searched by:
* name 
* tags 
* location. 
Most of the values on how many sensors are mocked, what tags are used and the degree of location accuracy can be 
modified in the *constants.ts* file. Locations are randomly picked in a box bounded roughly by Minniapolis 
on the north, Memphis in the east, San Antonio in the south and Salt Lake in the west. This is mostly to 
be fairly certain the location is on land and within the US. Created sensors can use any valid latitude 
and longitude. 

Name and tag search is by simple case insensitive matching. Location matching is independent for latitude 
and longitude and is considered matched when the search parameter is within 0.1 degree, or about 5-10km
