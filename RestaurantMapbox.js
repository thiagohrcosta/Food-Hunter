var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbnJpcXVlODYiLCJhIjoiY2tnY2w5ejkxMHMxejJ5cXUzenFubmVhNSJ9.TH8V16mnAzFx2sZdGtuL8w';
var map = new mapboxgl.Map({
container: 'mapBoxContent',
style: 'mapbox://styles/mapbox/streets-v11'
});