const { Router } = require("express");
const express = require("express");
const authRouter = express.Router();
// const User = require('../models/User');

const { OAuth2Client, UserRefreshClient } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)



authRouter.post('/login', (req, res) => { 
    const {tokenId} = req.body;

    client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID}).then(response => {
        const {email_verified, name, email} = response.getPayload;

       
    });
});

module.exports = authRouter;