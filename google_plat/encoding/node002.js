const encode = require('geojson-polyline').encode;
const polygon = {
    type: 'Polygon',
    coordinates: [
        [[-81.63829, 41.48093], [-81.63628, 41.47993], [-81.63625, 41.47931], [-81.63829, 41.48033], [-81.63829, 41.48093]]
    ]
};
const encoded = encode(polygon);
console.log("hello"+ encoded.toString);
// return encoded;
// => { type: 'Polygon', coordinates: ['yvd|Fh~gqNfEqKzBEkEvKwB?'] }