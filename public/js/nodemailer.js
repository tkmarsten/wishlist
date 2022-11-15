const emailBtn = document.querySelector('#emailBtn')
emailBtn.addEventListener('click', e => {

  console.log(e)
  const receivingEmail = document.querySelector('#receivingEmail').value
  const userName = document.getAttribute('data-userName')

  const emailObj = {
    from: 'oogabooga@gmail.com',
    to: receivingEmail,
    subject: 'Wishlist',
    text: `${userName} has sent you their wishlist!
    Check it out here: `
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

// //need to get fullURL
// let fullUrl = "n/a"

// let mailOptions = {
//   from: process.env.EMAIL,
//   to: process.env.EMAIL,
//   subject: 'Wishlist',
//   text: 'Hello there'
// }