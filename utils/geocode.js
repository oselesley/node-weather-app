const request = require('request')

const geocode = (query, callback) => {
  const url =
   `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoib3NlbGVzbGV5IiwiYSI6ImNrMHdwcGh5azBnN2IzanBmem50NTY2cXEifQ.0x9xBySvzPd7OyKlgAtfdA&limit=1`

  request({ url, json: true }, (error, response) => {
    if (error) callback ('Unable to connect to mapbox servers', undefined)
    else if (!response.body.features || !response.body.features.length) callback('Unable to fetch geocoding data!', undefined)
    else {
      const data = {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      };
      callback(undefined,data)
    }
  })
}

module.exports = geocode
