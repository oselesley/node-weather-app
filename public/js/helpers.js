const userLocation = document.querySelector('.location')
const forecast = document.querySelector('.forecast')

const clearFields = () => {
  userLocation.textContent = ''
  forecast.textContent = ''
}

const renderText = (locationText = '', forecastText = '', error = false) => {
  if (error) {
    userLocation.classList.add('error')
  } else userLocation.classList.remove('error')

  userLocation.textContent = locationText
  forecast.textContent = forecastText
}
