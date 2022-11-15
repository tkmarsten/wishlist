const router = require('express').Router()
const userRoutes = require('./userRoutes')
const wishlistRoutes = require('./wishlistRoutes')
const itemRoutes = require('./itemRoutes')
const emailRoutes = require('./emailRoutes')

router.use('/users', userRoutes)
router.use('/wishlists', wishlistRoutes)
router.use('/items', itemRoutes)
router.use('/mailer', emailRoutes)

module.exports = router;