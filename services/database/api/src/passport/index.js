const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = {
  useJwtStrategy: () => {
    passport.use(
      new Strategy(opts, (jwtPayload, done) => {
        return (
          User.findById(jwtPayload.id)
            .then((user) => {
              if (user) {
                return done(null, user);
              }
              return done(null, false);
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err))
        );
      })
    );
  },
  authenticate: passport.authenticate('jwt', { session: false }),
};