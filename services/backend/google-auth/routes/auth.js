const { Router } = require("express");
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const express = require("express");
const authRouter = express.Router();
const _pgp = require("pg-promise");
const { OAuth2Client, UserRefreshClient } = require('google-auth-library');
const client = new OAuth2Client("496676445798-shpgurrglhd6do2b34s7v2l2slo5enkb.apps.googleusercontent.com");
require ('custom-env').env(true);

/*
const pgp = _pgp({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

const username = "postgres";
const password = "12345";
const url = `postgres://${username}:${password}@localhost/`;
const db = pgp(url);
async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        throw e;
    } finally {
        try {
            connection.done();
        } catch (ignored) {
            // eslint-disable-next-line no-unsafe-finally  
        }
    }
}
*/

       /* async function getEmail(email){
            try {
                await connectAndRun(db => db.many("SELECT * FROM users where email = $1", [email]));
                const token = jwt.sign({_id: user._id}, process.env.SECRET, {
                        expiresIn: 31556926, // 1 year in seconds
                    });
    
                    const {_id, name, email} = user;
    
                    res.json({
                        token,
                        user : {_id, name, email}
                    })
                }
                else{
                    let password = email+process.env.SECRET;
                    let newUser = new User({name, email, password});
                }
            }
            catch (err) {
                throw err;
                };   
        }
        
        if (email_verified) {
            getEmail();
        
        }
    
    }
        */

        // Links: https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
        // https://www.youtube.com/watch?v=LA16VCpUido&ab_channel=AwaisMirza


module.exports = authRouter;