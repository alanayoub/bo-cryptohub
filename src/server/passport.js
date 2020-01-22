import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { UsersModel } from '../db/schema';
import { isProd } from '../settings';

export default function passport(passport) {

  passport.use(new GoogleStrategy({
      clientID: '856019890230-t05m8de3a6cr83mcakqd3c9une9k636v.apps.googleusercontent.com',
      clientSecret: 'QwoCwuU8p61iZhtuNqnd_h0g',
      callbackURL: (isProd ? 'https://binaryoverdose.com' : 'http://localhost:3001') + '/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken, refreshToken, profile, done);
      done(null, profile);
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    UsersModel.findOne({'google.id': id}, function (error, user) {
      done(error, user);
    });
  });

}
