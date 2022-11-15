const express = require('express');
const router = express.Router();
const { Wishlist, Item, User } = require('../models');

// GET homepage
router.get('/', async (req, res) => {
  res.render('home', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id
  })
})

//login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/profile')
  }
  res.render('login', {
    loggedIn: false,
    user_id: null
  })
})

//profile page
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

//random profile
router.get("/random", async (req, res) => {

  let temp = []
  const wishlistArray = await Wishlist.findAll()

  wishlistArray.map(wishlist => {
    temp.push(wishlist.get({ plain: true }).id)
  })

  const randomID = Math.floor(Math.random() * temp.length)
  console.log(randomID)
  Wishlist.findByPk(temp[randomID],
    { include: { all: true } }
  ).then(listData => {
    const listDataHbsData = listData.get({ plain: true });
    console.log(listDataHbsData)
    res.render("list-details", listDataHbsData)
  })
})

//all users
router.get("/viewallusers", (req, res) => {
  User.findAll().then(alluserData => {
    const alluserDataHbsData = alluserData.map(allusers => allusers.get({ plain: true }))
    console.log(alluserDataHbsData)
    res.render("allusers", alluserDataHbsData)
  })
})

module.exports = router