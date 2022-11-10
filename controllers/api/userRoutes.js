const router = require('express').Router()
const { User, Wishlist } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [Wishlist]
    })

    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
})
//one user
router.get('/:id',(req,res)=>{
  User.findByPk(req.params.id,{
    include:[Wishlist]
}).then(user=>{
    const userHbsData = user.get({plain:true});
    console.log(user);
    console.log("==============")
    console.log(userHbsData)
    res.render("user",userHbsData)
})
})

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    })

    req.session.save(() => {
      req.session.user_id = dbUserData.id
      req.session.loggedIn = true
      res.status(200).json(dbUserData)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { username: req.body.username } })

    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect username.' })
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password)

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password.' })
      return;
    }

    // Session variable
    req.session.save(() => {
      req.session.user_id = dbUserData.id
      req.session.loggedIn = true
      req.session.cookie
      res.status(200).json({ user: dbUserData, message: 'You are now logged in.' })
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})


module.exports = router
