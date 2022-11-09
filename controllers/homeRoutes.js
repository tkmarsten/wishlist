const express = require('express');
const router = express.Router();
const { Wishlist, Item, User } = require('../models');
const wishlistData = require('../seeds/wishlist.json')

// GET homepage
router.get('/', async (req, res) => {
  res.render('home')
})

router.get("/sessions", (req, res) => {
  res.json(req.session)
})

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/profile')
  }
  res.render('login')
})

router.get("/profile", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login")
  }
  User.findByPk(req.session.user_id, 
    {
    include: [Wishlist]
  }
  ).then(userData => {
    const hbsData = userData.toJSON();
    console.log(hbsData)
    hbsData.loggedIn = req.session.loggedIn
    res.render("profile", hbsData)
  })
})


router.get("/random", (req,res) => {
    const randomID = Math.floor(Math.random() * wishlistData.length)
    console.log(randomID)
  Wishlist.findByPk( randomID ,
  {
  include: [Item]
}
  ).then(
    listData => {
  //   // const hbsData = listData.toJSON();
  //   console.log(listData)
  //   // res.render("list-details", hbsData)
    res.render("list-details",listData)
  }
  )
  });



module.exports = router