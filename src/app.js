const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// set the publicpath directory and the views directory and also the partials directory for hbs
const publicPathDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set the templating engine and the directory'
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
// register the partials directory with HBS
hbs.registerPartials(partialsPath)

// set the static file directory
app.use(express.static(publicPathDirectory))

// render a handlebars template from the views directory
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Leslie Okoduwa'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    author: 'Leslie Okoduwa'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: 'Help Page!',
    author: 'Leslie Okoduwa'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Unable to find location. Try another search!'
    })
  }
  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) return res.send({
      error
    })
    forecast(long, lat, (error, { daily, currently } = {}) => {
      if (error) return res.send({
        error
      })
      const forecastMsg = `${daily.data[0].summary}. It is currently ${currently.temperature} degrees out. There is ${currently.precipProbability + '%'} chance of rain. `
      res.send({
        location: location,
        forecast: forecastMsg,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMsg: 'Help article not found!',
    title: '404',
    author: 'Leslie okoduwa'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMsg: 'Page not found!',
    title: '404',
    author: 'Leslie Okoduwa'
  })
})
app.listen(3000, () => {
  console.log('Listening...')
})
