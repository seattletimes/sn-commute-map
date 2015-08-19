// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("component-leaflet-map");

var data = require("./censusData.geo.json");

var mapElement = document.querySelector("leaflet-map");
var L = mapElement.leaflet;
var map = mapElement.map;

map.scrollWheelZoom.disable();

function getColor(d) {
  return d > 0.09 ? '#006837' :
         d > 0.06 ? '#1a9850' :
         d > 0.03 ? '#66bd63' :
         d > 0.01 ? '#a6d96a' :
         d > 0 ?    '#d9ef8b' :
         d > -.01 ? '#fee08b' :
         d > -.03 ? '#fdae61' :
         d > -.06 ? '#f46d43' :
         d > -.09 ? '#d73027' :
                    '#a50026' ;
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.jobschange),
    weight: 0,
    fillOpacity: 0.25
  };
}

L.geoJson(data, {style: style}).addTo(map);

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
    weight: 4,
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

  var currentId = current.getAttribute("data-poi");

  var currentStop = poi[currentId];
  if (currentStop instanceof L.Marker) {
    currentStop._icon.classList.remove("active");
  } else {
    currentStop.setStyle({color: "#4abe9d"});
  }

  var goId = go.getAttribute("data-poi");

  var stop = poi[goId];
  if (stop instanceof L.Marker) {
    stop._icon.classList.add("active");
  } else {
    stop.setStyle({color: "#f57d20"});
  }
};

var buttons = document.querySelectorAll(".controls .fa");
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  button.addEventListener("click", onClick);
}
