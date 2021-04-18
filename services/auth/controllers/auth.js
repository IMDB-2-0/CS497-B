const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const client = new OAuth2Client()
const axios = require('axios');

const router = express.Router();

router.post('/googlelogin',  (req, res) => {
    const { tokenId } = req.body;

    // console.log(req.body);
    // Sconsole.log("Token arrived at server: " + token);
    // console.log(process.env.GOOGLE_LOGIN)
    client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_LOGIN
    }).then(response => {
      console.log(response.payload)
      const {email_verified, name, email} = response.payload;
      const new_payload = { email_verified: email_verified, name: name, email: email };
      // axios.post("/api/v1/auth/googlelogin", 
      // {tokenId: googleData.tokenId})
      console.log(new_payload);
      return axios.post('/api/v1/database/user/login', new_payload)
                .then((res) => {
                  return res;
                }).catch((err) => {
                  console.log(err);
                })
    }).catch(err => {
        console.log(err);
        res.status(400).json({ message: err});
    });
});
    
module.exports = router;

  /*
  console.log(ticket);
  const { name, email, aud, iss } = ticket.getPayload();

  if (aud === process.env.REACT_APP_GOOGLE_CLIENT_ID && (iss === "accounts.google.com" || iss === "https://accounts.google.com:")){
    console.log(token);
    const user = await connectAndRun(db => db.any("SELECT * FROM users where email = $1;", [email]));
    console.log(user.length);
    if (user.length !== 0){
      console.log(user);
      req.session.userId = token;
      res.status(201);
      res.json(user);
    }
    else{
      try{
        const user = await connectAndRun(db => db.none("INSERT INTO users VALUES (1,2, 3,4, $5);", [email, token, name, null]));
        console.log(user);
        req.session.userId = token;
        res.status(201);
        res.json(user);
      }
      catch(err){
        throw err;
      }
    }  
  }
});

*/