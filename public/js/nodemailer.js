const emailBtn = document.querySelector('#emailBtn')
emailBtn.addEventListener('click', e => {
  const emailObj = {
    from: 'oogabooga@gmail.com',
    to: 'tkmarsten@gmail.com',
    subject: 'Wishlist',
    text: 'Test email'
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