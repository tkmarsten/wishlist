const router = require('express').Router();
const { Wishlist, Item } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await Wishlist.findAll({})
    console.log(req.session.user_id)
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const userData = await Wishlist.findAll({
      where: {
        user_id: req.params.id
      }
    })
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router