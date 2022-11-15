const baseUrl = 'https://team7-wishlist-app.herokuapp.com/'

const emailBtn = document.querySelector('#sendWishlist')
emailBtn.addEventListener('submit', e => {
  e.preventDefault()

  console.log(e)
  const receivingEmail = document.querySelector('#receivingEmail').value
  const userName = document.querySelector('#emailBtn').getAttribute('data-userName')
  const wishlistId = document.querySelector('#wishlistSelect').value

  const emailObj = {
    from: 'oogabooga@gmail.com',
    to: receivingEmail,
    subject: 'Wishlist',
    text: userName + ' has sent you their wishlist! Check it out here: ' + baseUrl + 'api/wishlists/' + wishlistId
  }

  fetch('/api/mailer', {
    method: 'POST',
    body: JSON.stringify(emailObj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      alert('Success')
    } else {
      alert('Stinky')
    }
  })
})