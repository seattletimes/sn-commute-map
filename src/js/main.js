// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("component-leaflet-map");

var mapElement = document.querySelector("leaflet-map");
var L = mapElement.leaflet;
var map = mapElement.map;

map.scrollWheelZoom.disable();

var coordinates = {
  westseattle: [47.54617, -122.3744114],
  downtown: [47.61442, -122.3439376],
  home: [47.450451, -122.1607646],
  auburn: [47.2956455, -122.2048925]
}

var drawLine = function(location1, location2) {
  var pointA = new L.LatLng(location1[0],location1[1]);
  var pointB = new L.LatLng(location2[0],location2[1]);
  var pointList = [pointA, pointB];

  var firstpolyline = new L.Polyline(pointList, {
  color: '#4abe9d',
  weight: 3,
  opacity: 1,
  smoothFactor: 1

  });
  firstpolyline.addTo(map);
}

drawLine(coordinates.westseattle, coordinates.downtown);
drawLine(coordinates.home, coordinates.downtown);
drawLine(coordinates.home, coordinates.auburn);

for (var location in coordinates) {
  L.circle([coordinates[location][0],coordinates[location][1]], 500, {
    color: '#524fa2',
    fillOpacity: 1
  }).addTo(map);
};