const express = require('express');
const router = require('express').Router();
const { Wishlist, Item, User } = require('../../models');

router.get("/sessions",(req,res)=>{
  res.json(req.session)
})

router.get('/', async (req, res) => {
  try {
    const userData = await Wishlist.findAll({
      include:[Item]
    })
    console.log(req.session.user_id)
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get("/:id",(req,res)=>{
  Wishlist.findByPk(req.params.id,{
      include:[Item]
  }).then(wishlist=>{
      const wishlistHbsData = wishlist.get({plain:true});
      console.log(wishlist);
      console.log("==============")
      console.log(wishlistHbsData)
      wishlistHbsData.logged_in=req.session.logged_in
      res.render("list-details",wishlistHbsData)
  })
})

module.exports = router