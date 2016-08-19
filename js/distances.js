var request = require('request'),
    fs = require('fs');

var accessToken = 'pk.eyJ1IjoiZ2Vvc2hlcGhlcmRzIiwiYSI6ImNpZmZxZ2J5ODAwa2x0amtuM3Rmb3h3aTQifQ.Q7wUukmeICs7PgNEoucqMg';

var cityBikesJSON = JSON.parse(fs.readFileSync('./data/citybikes.geojson'));

var url = 'https://api.mapbox.com/distances/v1/mapbox';
var path = '/cycling?access_token=' + accessToken;
var coords = [];

cityBikesJSON.features.forEach(function(index) {
  var arr = index.geometry.coordinates;
  var xyarr = arr.slice(0,2);
  coords.push(xyarr);
});
coords.push(cityBikesJSON.features[0].geometry.coordinates);

request({
  url: url + path,
  method: 'POST',
  data: coords,
  path: '/',
  headers: {
    'Content-Type': 'application/json'
  }
}, function(err, response, body) {
  if(err) {
    console.log(err);
  } else {
    console.log(response.statusCode, body);
  }  
});
