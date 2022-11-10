require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

//need to get fullURL
let fullUrl="n/a"

let mailOptions = {
  from: 'artembootcampapi@gmail.com',
  to: 'artem011202@gmail.com',
  subject: 'Wishlist',
  html: "Check out this Wishlist: " + fullUrl
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent!');
  }
});