const express = require('express');
const router = express.Router();
const { Wishlist, Item, User } = require('../models');

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

module.exports = router