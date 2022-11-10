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
  Wishlist.findByPk(req.params.id, {
    include: [Item]
  })
    .then(wishlist => {
      const wishlistHbsData = wishlist.get({ plain: true });
      console.log(wishlist);
      console.log("==============")
      console.log(wishlistHbsData)
      wishlistHbsData.loggedIn = req.session.loggedIn
      res.render("list-details", wishlistHbsData)
    })
})


// Create a wishlist
router.post('/', async (req, res) => {
  try {
    const newWishlistData = await Wishlist.create(req.body,{user_id: req.session.user_id})


    res.status(200).json(newWishlistData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update wishlist 
router.put('/:id', async (req, res) => {
  try {
    const wishlistData = await Item.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!wishlistData[0]) {
      res.status(404).json({ message: 'Wishlist with this ID not found' });
      return;
    }

    res.status(200).json(wishlistData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete wishlist items
router.delete('/:id', async (req, res) => {
  try {
    const wishlistData = await Item.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!wishlistData) {
      res.status(404).json({ message: 'Wishlist with this ID not found' });
      return;
    }

    res.status(200).json(wishlistData)
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router