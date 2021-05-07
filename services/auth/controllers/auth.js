const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const client = new OAuth2Client()
const axios = require('axios');

const router = express.Router();

router.post('/googlelogin',  async(req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_LOGIN
    }).then(response => {
      const {email_verified, name, email} = response.payload;
      const new_payload = { email_verified: email_verified, name: name, email: email };
      axios.post('http://nginx:5050/api/v1/database/user/login', new_payload)
        .then((res_info) => {
          // console.log(res_info)
          // User registered
          if (res_info.status === 201) {
            return res.status(res_info.status).json(res_info.data);
          // User exists
          } else {  
            return res.status(200).json(res_info.data);
          }
          
        }).catch((err) => {
          console.log(err);
          res.status(400).json({message: err});
        });
      // return result;
    }).catch(err => {
        console.log(err);
        res.status(400).json({ message: err});
    });
});
    
module.exports = router;