// const passport = require('passport');
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { pool } from '../database';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../', '.env') });

console.log(__dirname)

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: 'secret'
}

export const useJwtStrategy = function() {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      return (
        pool.query('SELECT userID FROM users WHERE userId = $1::text', [jwtPayload.id], (error, results) => {
          if (error) return done(error,false);
          if (results.rows.length === 0)  return done(null,false);
          else return done(null, done)
        })
      )
    })
  )
}

export const authenticate = function() {
  passport.authenticate('jwt', { session: false })
}