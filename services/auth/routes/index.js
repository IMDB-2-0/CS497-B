const express = require('express')
const googlelogin = require('../controllers/auth');

const router = express.Router();

router.use(googlelogin);
router.get('/status', async (req, res) => {
    return res.status(200).json({ message: 'auth is running.' });
});

module.exports = router;