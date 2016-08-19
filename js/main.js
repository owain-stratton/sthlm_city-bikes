var mapbox = require('mapbox.js'),
    turf = require('turf'),
    fs = require('fs'),
    $ = require('jquery');

var accessToken = 'pk.eyJ1IjoiZ2Vvc2hlcGhlcmRzIiwiYSI6ImNpZmZxZ2J5ODAwa2x0amtuM3Rmb3h3aTQifQ.Q7wUukmeICs7PgNEoucqMg'
L.mapbox.accessToken = accessToken;

var map = new L.mapbox.map('map', 'mapbox.streets');
var featureLayer = L.mapbox.featureLayer();
featureLayer.loadURL('../data/citybikes.geojson');

var legend = map.legendControl.addLegend(document.getElementById('legend').innerHTML);
legend.setPosition('topright');

// function getHTML() {
//   var html = '<h2>';
//       html += 'Stockholm City Bike Map';
//       html += '</h2>';
//       html += '<p>';
//       html += '<strong>Click </strong>';
//       html += 'on a City Bike Station on the map! ';
//       html += 'A travel time will be generated to all the other City Bike Stations. ';
//       html += '</p><p>';
//       html += '<i>Note:</i> time is in <strong>minutes</strong> based on an average speed of <strong>15.5km/h</strong>.';
//       html += '</p><p>';
//       html += 'Data from: <a href="http://open.stockholm.se/oppna-data/" target="_blank">Stockholm City Open Data</a>';
//       html += '</p>';
//   return html;
// };

var units = 'kilometers'; // units for distance measurement

var getDistance = function(pointA, pointB, units) {
  return turf.distance(pointA, pointB, units);
};

var getDuration = function(data) {
  // time = distance * speed
  var speed = 15.5; // average bike speed in a city
  var duration = data.distance * speed;
  if(duration >= 100) {
    return 99
  } else {
    return Math.round(duration);
  }
};

var colorByDuration = function(duration) {
  return duration === 'bicycle' ? '#009688' :
    duration === 0 ? '#999999' :
    duration <= 10 ? '#388E3C' :
    duration <= 20 ? '#4CAF50' :
    duration <= 30 ? '#7CB342' :
    duration <= 40 ? '#9CCC65' :
    duration <= 50 ? '#CDDC39' :
    duration <= 60 ? '#FF9800' :
    '#FF5722';
};

featureLayer.on('ready', function() {

  map.fitBounds(featureLayer.getBounds());
  var duration = 'bicycle';

  var cityBikeDest = featureLayer.getGeoJSON();
  $.each(cityBikeDest.features, function(index, value) {
    $.extend(value.properties, {
      'title': value.properties.Beskrivnin,
      'marker-symbol': duration,
      'marker-color': colorByDuration(duration)
    });
  });
  featureLayer.setGeoJSON(cityBikeDest).addTo(map);


  featureLayer.on('click', function(e) {
    console.log(e.layer);
    e.layer.openPopup();
    // e.layer.bringToFront();
    var cityBikeStart = e.layer.feature;

    $.each(cityBikeDest.features, function(index, value) {
      var startPoint = cityBikeStart.geometry.coordinates,
          destPoint = value.geometry.coordinates;

      var distance = getDistance(startPoint, destPoint, units);
      value.properties.distance = distance;

      var duration = getDuration(value.properties);
      value.properties.duration = duration;

      value.properties['marker-symbol'] = duration;
      value.properties['marker-color'] = colorByDuration(duration);
    }); // end loop
    featureLayer.setGeoJSON(cityBikeDest);
  }); // end click event

  featureLayer.on('mouseover', function(e) {
    e.layer.openPopup();
    e.layer.options.riseOnHover = true;
  });

  featureLayer.on('mouseout', function(e) {
    e.layer.closePopup();
  });

}); // end map ready function
