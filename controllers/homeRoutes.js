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

router.get("/random", (req,res) => {
  function getRandomWishlist () {
    const randomID = Math.floor(Math.random()*100 + 1)
    console.log(randomID)
    Wishlist.findByPk( randomID ,
      {include: {all:true}}
  ).then(listData=>{
    if (listData) {
      const listDataHbsData = listData.get({plain:true});
      // console.log(listDataHbsData)
      return res.render("list-details",listDataHbsData)
      
    }
    getRandomWishlist()

  })
}
})
// getRandomWishlist()
// router.get("/random", async (req, res) => {

//   let randomID = null
//   do {
//     randomID = Math.floor(Math.random() * await Wishlist.count())
//   } while (randomID === null)
//   console.log(randomID)
//   Wishlist.findByPk(randomID,
//     { include: { all: true } }
//   ).then(listData => {
//     const listDataHbsData = listData.get({ plain: true });
//     console.log(listDataHbsData)
//     res.render("list-details", listDataHbsData)
//   })
// })

//all users
router.get("/viewallusers", (req, res) => {
  User.findAll().then(alluserData => {
    const alluserDataHbsData = alluserData.map(allusers => allusers.get({ plain: true }))
    console.log(alluserDataHbsData)
    res.render("allusers", alluserDataHbsData)
  })
})

module.exports = router