// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("component-leaflet-map");

var mapElement = document.querySelector("leaflet-map");
var L = mapElement.leaflet;
var map = mapElement.map;

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

if (window.matchMedia && window.matchMedia("(max-width: 480px)").matches) {
  L.marker([47.5, -122.17], {
    icon: L.divIcon({
      html: "<div class='map-label home'><strong>Nakhale's home</strong></div>"
    })
  }).addTo(map);

  L.marker([47.37, -122.35], {
    icon: L.divIcon({
      html: "<div class='map-label first'><strong>First job:</strong><br><em>FedEx Ground</em></div>"
    })
  }).addTo(map);

  L.marker([47.6, -122.29], {
    icon: L.divIcon({
      html: "<div class='map-label second'><strong>Second job:</strong><br><em>Downtown Key Bank</em></div>"
    })
  }).addTo(map);

  L.marker([47.53, -122.39], {
    icon: L.divIcon({
      html: "<div class='map-label alt'><em>or West Seattle Key Bank</em></div>"
    })
  }).addTo(map);
} else {
  L.marker([47.5, -122.14], {
    icon: L.divIcon({
      html: "<div class='map-label home'><strong>Nakhale's home</strong></div>"
    })
  }).addTo(map);

  L.marker([47.35, -122.35], {
    icon: L.divIcon({
      html: "<div class='map-label first'><strong>First job:</strong><br><em>FedEx Ground</em></div>"
    })
  }).addTo(map);

  L.marker([47.65, -122.3], {
    icon: L.divIcon({
      html: "<div class='map-label second'><strong>Second job:</strong><br><em>Downtown Key Bank</em></div>"
    })
  }).addTo(map);

  L.marker([47.53, -122.43], {
    icon: L.divIcon({
      html: "<div class='map-label alt'><em>or West Seattle Key Bank</em></div>"
    })
  }).addTo(map);
};

poi['A']._icon.classList.add("active");

var onClick = function(current, go) {
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

var buttons = document.querySelectorAll(".controls .button");
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i];

  button.addEventListener("click", function(e){
    var current = document.querySelector(".current");
    var go;

    if (e.target.classList.contains("disabled")) return;

    if (document.querySelector(".disabled")) {
      document.querySelector(".disabled").classList.remove("disabled");
    }

    if (this.classList.contains("left") ) {
      go = current.previousElementSibling;
      if (!go) {
        return;
      } else if (!go.previousElementSibling) {
        e.target.classList.add("disabled");
      }
    } else {
      go = current.nextElementSibling;
      if (!go) {
        return;
      } else if (!go.nextElementSibling) {
        e.target.classList.add("disabled");
      }
    }

    onClick(current, go);
  });
}

var stops = document.querySelectorAll(".timeline .stop");
for (var i = 0; i < stops.length; i++) {
  var stop = stops[i];

  stop.addEventListener("click", function(e) {
    document.querySelector(".controls .button.right").classList.remove("disabled");
    document.querySelector(".controls .button.left").classList.remove("disabled");
    var current = document.querySelector(".current");
    var go = e.target.closest(".stop");
    if (!go.previousElementSibling) {
      document.querySelector(".controls .button.left").classList.add("disabled");
    } else if (!go.nextElementSibling) {
      document.querySelector(".controls .button.right").classList.add("disabled");
    }
    onClick(current, go);
  });
}
