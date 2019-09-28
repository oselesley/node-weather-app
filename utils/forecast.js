const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/b6d394add0c13fd4cde4d46597ca5d2b/${latitude},${longitude}`

  request({ url, json: true }, (error, response) => {
    if (error) callback('Unable to connect to Darksky\'s servers', undefined)
    else if (response.body.error) callback('Unable to fetch forecast data', undefined)
    else {
      callback(undefined, response.body)
    }
  })
}

module.exports = forecast