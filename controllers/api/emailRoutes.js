const router = require('express').Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, //artembootcampapi@gmail.com
    pass: process.env.PASSWORD //wsopdbfdlyovjviz
  }
})

router.post('/', (req, res) => {
  const email = transporter.sendMail(req.body, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent!' + info.response);
    }
  })
  res.status(200).json(email)
})

module.exports = router