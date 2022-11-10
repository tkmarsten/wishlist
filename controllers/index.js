const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')

router.use('/api', apiRoutes);
router.use(homeRoutes)

router.get("/session", (req, res) => {
  res.json(req.session)
})

module.exports = router;