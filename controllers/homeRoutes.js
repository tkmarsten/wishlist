const express = require('express');
const router = express.Router();
const { Wishlist, Item, User } = require('../models');
const wishlistData = require('../seeds/wishlist.json')

// GET homepage
router.get('/', async (req, res) => {
  res.render('home', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id
  })
})

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/profile')
  }
  res.render('login', {
    loggedIn: false,
    user_id: null
  })
})

router.get("/profile", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login")
  }

  User.findByPk(req.session.user_id, {
    include: [Wishlist]
  })
    .then(userData => {
      const hbsData = userData.toJSON()
      console.log(hbsData)
      hbsData.loggedIn = true
      hbsData.user_id = req.session.user_id
      res.render("profile", hbsData)
    })
})


router.get("/random", (req,res) => {
    const randomID = Math.floor(Math.random() * wishlistData.length)
    console.log(randomID)
  Wishlist.findByPk( randomID ,
  {include: {all:true}}
  ).then(listData=>{
    const listDataHbsData = listData.get({plain:true});
    console.log(listDataHbsData)
    res.render("list-details",listDataHbsData)
})
})



module.exports = router