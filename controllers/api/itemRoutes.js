const router = require('express').Router()
const { Item } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const itemData = await Item.findAll()

    res.status(200).json(itemData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/:id", async (req, res) => {
  Item.findByPk(req.params.id)
    .then(item => {
      const itemHbsData = item.get({ plain: true });
      console.log(item);
      console.log("==============")
      console.log(itemHbsData)
      itemHbsData.loggedIn = req.session.loggedIn
      res.render("item-details", itemHbsData)
    })
})

// Create a wishlist item
router.post('/', async (req, res) => {
  try {
    const itemData = await Item.create(req.body)

    res.status(200).json(itemData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Updates wishlist items
router.put('/:id', async (req, res) => {
  try {
    const itemData = await Item.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!itemData[0]) {
      res.status(404).json({ message: 'Item with this ID not found' });
      return;
    }

    res.status(200).json(itemData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete wishlist items
router.delete('/:id', async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!itemData) {
      res.status(404).json({ message: 'Item with this ID not found' });
      return;
    }

    res.status(200).json(itemData)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router;