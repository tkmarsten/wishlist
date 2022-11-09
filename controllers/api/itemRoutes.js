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

// Create a wishlist item
router.post('/', async (req, res) => {
  try {
    const itemData = Item.create({
      name: req.body.name,
      quantity: req.body.quantity,
      link: req.body.link,
    })
    res.status(200).json(itemData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Updates wishlist items
router.put('/:id', (req, res) => {
  try {
    const itemData = Item.update({
      name: req.body.name,
      quantity: req.body.quantity,
      link: req.body.link,
    },
      {
        where: {
          id: req.params.id,
        }
      })
  } catch (err) {

  }
});

// Delete wishlist items
router.delete('/:id', (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedItem) => {
      res.json(deletedItem);
    })
    .catch((err) => res.json(err));
});


module.exports = router;