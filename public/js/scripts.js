console.log('Client side javascript yay!!')

document.querySelector('#search-form').addEventListener('submit', e => {
  e.preventDefault()
  const query = document.querySelector('#search-input').value
  document.querySelector('#search-input').value = ''
  renderText('Loading...', '')
  fetch('/weather?address=' + query).then(response => {
    response.json().then(data => {
      if (data.error) {
        renderText(data.error, '', true)
      }
      else {
        renderText(data.location, data.forecast)
      }
    })
  })
})

