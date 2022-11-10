const router = require('express').Router()
const { Wishlist, Item } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const wishlistData = await Wishlist.findAll({
      include: [Item]
    })

    res.status(200).json(wishlistData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// router.get('/:id', async (req, res) => {
//   try {
//     const wishlistData = await Wishlist.findAll({
//       where: {
//         user_id: req.params.id
//       },
//       include: [Item]
//     })
//     res.status(200).json(wishlistData)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

router.get("/:id", (req, res) => {
  Wishlist.findByPk(req.params.id, {include: {all:true}})
    .then(wishlist => {
      const wishlistHbsData = wishlist.get({ plain: true });
      console.log(wishlist);
      console.log("==============")
      console.log(wishlistHbsData)
      wishlistHbsData.loggedIn = req.session.loggedIn
      res.render("list-details", wishlistHbsData)
    })
})

module.exports = router