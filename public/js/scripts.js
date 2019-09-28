console.log('Client side javascript yay!!')

document.querySelector('#search-form').addEventListener('submit', e => {
  e.preventDefault()
  const query = document.querySelector('#search-input').value
  console.log(query)
  renderText('Loading...', '')
  fetch('http://localhost:3000/weather?address=' + query).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error)
        renderText(data.error, '', true)
      }
      else {
        console.log(data.location)
        console.log(data.forecast)

        renderText(data.location, data.forecast)
      }
    })
  })
})

