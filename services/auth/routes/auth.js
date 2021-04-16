const express = require('express')
const router = express.Router();

const { googlelogin } = require("../controllers/auth");

router.post('/googlelogin', googlelogin);