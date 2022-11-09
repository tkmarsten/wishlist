const router = require('express').Router();
const { Wishlist, Item } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await Wishlist.findAll({
      include: [{ model: Item }]
    })
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router