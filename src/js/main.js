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
  A: [47.45, -122.16],
  B: [47.34, -122.22],
  C: [47.61, -122.34],
  D: [47.56, -122.37]
}

var drawLine = function(location1, location2) {
  var pointA = new L.LatLng(location1[0],location1[1]);
  var pointB = new L.LatLng(location2[0],location2[1]);
  var pointList = [pointA, pointB];

  var polyline = new L.Polyline(pointList, {
  color: '#4abe9d',
  weight: 3,
  opacity: 1,
  smoothFactor: 1

  });
  polyline.addTo(map);
  return polyline;
}

var poi = {
  CD: drawLine(coordinates.D, coordinates.C),
  AC: drawLine(coordinates.A, coordinates.C),
  AB: drawLine(coordinates.A, coordinates.B)
};

for (var location in coordinates) {
  poi[location] = L.marker([coordinates[location][0],coordinates[location][1]], {
    icon: L.divIcon({
      html: location
    })
  }).addTo(map);
};

var current = 0;

var onClick = function() {
  var current = document.querySelector(".current");
  var go;
  if (this.classList.contains("left") ) {
    go = current.previousElementSibling;
  } else {
    go = current.nextElementSibling;
  }
  if (!go) return;
  current.classList.remove("current");
  go.classList.add("current");
  console.log(go.getAttribute("data-poi"));
};

var buttons = document.querySelectorAll(".controls .fa");
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  button.addEventListener("click", onClick);
}