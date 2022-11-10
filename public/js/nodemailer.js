require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, //artembootcampapi@gmail.com
    pass: process.env.PASSWORD //wsopdbfdlyovjviz
  }
});

//need to get fullURL
let fullUrl="n/a"

let mailOptions = {
  from: sendingemail,//sending email input
  to: recivingemail,// reciving email input 
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