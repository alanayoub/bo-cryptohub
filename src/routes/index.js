import passport from 'passport';
import { UsersModel } from '../db/schema';

export default function (app) {

  app.post('/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ]
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function(req, res) {
      console.log(req, res);
      const anonymousId = req.cookies.aId;
      const profile = req.user;
      const query = {anonymousId};
      const google = {};
      if (profile.id) {
        google.id = profile.id;
      }
      if (profile.displayName) {
        google.displayName = profile.displayName;
      }
      if (profile.emails && Array.isArray(profile.emails)) {
        google.emails = profile.emails;
      }
      if (profile.name) {
        google.name = {};
        if (profile.name.familyName) {
          google.name.familyName = profile.name.familyName;
        }
        if (profile.name.givenName) {
          google.name.givenName = profile.name.givenName;
        }
      }
      if (profile.photos && Array.isArray(profile.photos)) {
        google.photos = profile.photos;
      }
      if (profile._json && profile._json.local) {
        google.local = profile.local;
      }
      const update = {google};
      UsersModel.findOneAndUpdate(query, update, {upsert: true, new: true}, (error, user) => {
        if (error) {
          console.log({error: error});
        }
      });

      res.redirect('/');
    }
  );

  // app.post('/logout', function(req, res){
  //   req.logout();
  //   res.redirect('/');
  // });

  app.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/user', function(req, res) {
    const user = req.user ? req.user.toJSON() : {};
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  });

}

