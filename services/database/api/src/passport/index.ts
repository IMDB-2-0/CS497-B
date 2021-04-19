// const passport = require('passport');
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { pool } from '../database';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: process.env.SECRET 
}

export const useJwtStrategy = function() {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      return (
        pool.query('SELECT userID FROM users WHERE userId = $1::text', [jwtPayload.id], (error, results) => {
          if (error) return done(null,false);
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

/*
module.exports = {
  useJwtStrategy: () => {
    passport.use(
      new Strategy(opts, (jwtPayload, done) => {
        return (
          pool.query('SELECT userID FROM users WHERE userId = $1::text', [jwtPayload.id], (error, results) => {
            if (error) return done(null,false);
            if (results.rows.length === 0)  return done(null,false);
            else return done(null, done)
          })
        )
      })
    )
  },
  authenticate: passport.authenticate('jwt', { session: false })
};
*/