const router = require('express').Router();
const { Item } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await Item.findAll()
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router