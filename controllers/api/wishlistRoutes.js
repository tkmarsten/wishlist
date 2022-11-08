const router = require('express').Router();
const { User, Item } = require('../../models');

// GET all wishlist items
router.get('/', async (req, res) => {
    Item.findAll().then(wishlists=>{
    const wishlistData = wishlists.map(wishlist=>wishlist.get({plain:true}))
    console.log(wishlistData);
 
    res.render("home",{
        wishlists:wishlistData,
        loggedin:req.session.loggedin
    })
})
})

router.get("/sessions",(req,res)=>{
res.json(req.session)
}) 

router.get("/login",(req,res)=>{
    if(req.session.loggedin){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.loggedin){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Item]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.loggedin=req.session.loggedin
        res.render("profile",hbsData)
    })
})

module.exports = router