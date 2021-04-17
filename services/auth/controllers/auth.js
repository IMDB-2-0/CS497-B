const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const client = new OAuth2Client()

const router = express.Router();

router.post('/googlelogin',  (req, res) => {
    const { token } = req.body;

    console.log("Token arrived at server: " + token);
    console.log(process.env.GOOGLE_LOGIN)
    client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_LOGIN
    }).then(response => {
        const {email_verified, name, email} = response.payload;
        print("hi " + response.payload);
        // if(email_verified) {
        //     
        // } else {
        //    
        // }
        res.status(200).json({result: token});
    }).catch(err => {
        res.status(400).json({ message: "something went wrong"});
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