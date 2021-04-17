const express = require('express')
const googlelogin = require('../controllers/auth');

const router = express.Router();

router.use(googlelogin);
module.exports = router;