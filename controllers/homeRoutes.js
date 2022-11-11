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
    const randomID = Math.floor(Math.random()*10 + 1)
    console.log(randomID)
    Wishlist.findByPk( randomID ,
      {include: {all:true}}
  ).then(listData=>{
    if (!listData) {
      getRandomWishlist()
    }
    const listDataHbsData = listData.get({plain:true});
    // console.log(listDataHbsData)
    res.render("list-details",listDataHbsData)
  })
}
  getRandomWishlist()
})

// //get random id from 1-10 redirect to 1 if doesn't exist
// router.get("/random", (req,res) => {
  //   const randomID = Math.floor(Math.random()*10 + 1)
  //   console.log(randomID)
  // Wishlist.findByPk( randomID ,
  // {include: {all:true}}
// ).then(listData=>{
  //   if (!listData) {
    //     return res.redirect('/api/wishlists/1')
    //   }
    //   const listDataHbsData = listData.get({plain:true});
    //   // console.log(listDataHbsData)
    //   res.render("list-details",listDataHbsData)
    // })
    // })
    
// //get random using seed data
//     //get seed data
//     const wishlistSeedData = require('../seeds/wishlist.json')

//   router.get("/random", (req,res) => {
//     const randomID = Math.floor(Math.random() * wishlistSeedData.length+1)
//     console.log(wishlistSeedData)
//     console.log(wishlistSeedData.length)
//     console.log(randomID)
//   Wishlist.findByPk( randomID ,
//   {include: {all:true}}
//   ).then(listData=>{
//     const listDataHbsData = listData.get({plain:true});
//     console.log(listDataHbsData)
//     res.render("list-details",listDataHbsData)
// })
// })

//all users
router.get("/viewallusers", (req,res) => {
  User.findAll(
{include: [Wishlist]}
).then(alluserData=>{
  const alluserDataHbsData = alluserData.map(allusers=>allusers.get({plain:true}))
  // console.log(alluserDataHbsData)
  res.render("allusers",alluserDataHbsData)
})
})

module.exports = router