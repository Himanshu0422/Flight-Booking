const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');
const { clientID, clientSecret } = require('./serverConfig');

passport.use(new GoogleStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/api/v1/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { email: profile.emails[0].value } });
    
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        type: 1 
      });
    } else {
      if (user.type !== 1) {
        return done(null, false, { message: "This email is registered using a different login method." });
      }
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
