
// $.getJSON('../data/citybikes.geojson')
//   .done(function(data) {
//     cityBikesJSON(data);
//   })
//   .fail(function(error) {
//     console.log(error);
//   });


// Create bounding box based on cityBikesJSON file using Turf.js ** bbox ** method
// function cityBikesJSON(data) {
//   console.log(data);
//   var units = 'kilometers';

  // var buffer = getBuffer(data.features[0], units);
  // var bbox = getBbox(buffer);
  // var pointGrid = getPointGrid(bbox, units);

  // data.features.forEach(function(index, data) {
  //
  // })
  // var distance = getDistance(data.features[0], units);
  // console.log(distance);
  //problem: for each city bike location generate a (bounding box OR a buffer) to a 'defined' range limit

  //problem: for each point in the pointGrid determine how far (distance/time) the point is from each city bike location

  //problem: remove points from pointGrid where the distance from the city bike location is greater than a 'defined' range
// }

// var getBuffer = function(data, units) {
//   var distance = 15.5; // average speed for a bicycle in a city in km/h
//   return turf.buffer(data, distance, units);
// }
//
// var getBbox = function(buffer) {
//   return turf.bbox(buffer);
// }
//
// var getPointGrid = function(bbox, units) {
//   var cellSize = 0.2; // spacing for each point in the grid (km)
//   return turf.pointGrid(bbox, cellSize, units);
// }

// var getConcave = function(grid, units) {
  // var maxEdge = 0.621371;
  // return turf.concave(grid, maxEdge, units);
//   var arr = [];
//   grid.features.forEach(function(coords) {
//     arr.push(coords.geometry.coordinates);
//   });
//   var poly = concaveman(arr, 0);
//   return poly;
// }



// var cityBikesJSON = function(cityBikeObject) {
//
//
//
//
//   map.on('style.load', function() {
//     console.log(cityBikeObject);
//     // geojsonSrc = new mapboxgl.GeoJSONSource({
//     //   data: '../data/cityBikes.geojson'
//     // });
//     map.addSource('cityBikes', {
//       type: 'geojson',
//       data: cityBikeObject
//     });
//
//     map.addLayer({
//       id: 'cityBikes',
//       type: 'symbol',
//       source: 'cityBikes',
//       layout: {
//         'icon-image': 'marker-15'
//       }
//     });
//
//
//
//   });
// }
