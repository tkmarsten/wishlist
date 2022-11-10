const router = require('express').Router();
const userRoutes = require('./userRoutes');
const wishlistRoutes = require('./wishlistRoutes')
const itemRoutes = require('./itemRoutes')

router.use('/users', userRoutes);
router.use('/wishlists', wishlistRoutes)
router.use('/items', itemRoutes)

module.exports = router;