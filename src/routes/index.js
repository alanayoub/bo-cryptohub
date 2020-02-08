import passport from 'passport';

import { defaultViews } from '../settings';
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
      const anonymousId = req.cookies.aId;
      const profile = req.user;
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
      // Check if googleId already exist
      UsersModel.findOne({'google.id': google.id}, (error, user) => {
        // Update existing user
        if (!error && user) {
          user.google = Object.assign(user.google, google);
          user.save(function (error) {
            if (error) {
              console.error('Error updating existing usere: ', error);
            }
          });
        }
        // Upgrade anonymouse user to full user
        else {
          const query = {anonymousId};
          UsersModel.findOneAndUpdate(query, update, {upsert: true, new: true}, (error, user) => {
            if (error) {
              console.log('Error upgrading anonymouse user to full user: ', error);
            }
          });
        }
      });

      res.redirect('/');
    }
  );

  app.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/api/user', function(req, res) {
    const response = {};
    if (req.isAuthenticated()) {
      const views = [];
      const user = req.user ? req.user.toJSON() : {};
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(views));
    }
    else {
      res.sendStatus(401);
    }
  });

  app.post('/api/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/views', function (req, res) {
    if (req.isAuthenticated()) {
      const profile = req.user;
      const googleId = profile.google.id;
      const query = {'google.id': googleId};
      UsersModel.findOne(query, (error, user) => {
        if (error) {
          console.log(`Error finding user with google.id: ${googleId}`);
          res.sendStatus(500);
        }
        else {
          const views = {
            user: (user.views && user.views.user) || [],
            default: defaultViews
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(views));
        }
      });
    }
    else {
      const views = {
        default: defaultViews
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(views));
    }
  });

  app.post('/api/views', function (req, res) {
    if (req.isAuthenticated()) {
      const profile = req.user;
      const googleId = profile.google.id;
      const query = {'google.id': googleId};
      const { slot, name, view, del } = req.body;
      if (
        (typeof del === 'boolean' || (typeof name === 'string' && typeof view === 'string'))
        && typeof slot === 'number'
        && slot < 6
        && slot > 0
      ) {
        UsersModel.findOne(query, (error, user) => {
          if (error) {
            console.log(`Error updating user with google.id: ${googleId}`);
            res.sendStatus(500);
          }
          else {
            if (!user.views.user) {
              user.views.user = [];
            }
            if (del) {
              if (user.views.user[slot - 1]) {
                const id = user.views.user[slot - 1]._id.toJSON();
                user.views.user.pull({_id: id});
              }
              else {
                return res.sendStatus(400);
              }
            }
            else {
              user.views.user[slot - 1] = {
                name,
                view,
                lastUpdated: +new Date()
              }
            }
            user.save();
            res.sendStatus(201);
          }
        });
      }
      else {
        res.sendStatus(400);
      }
    }
    else {
      res.sendStatus(401);
    }
  });

  app.get('/api/user', function (req, res) {
    const user = req.user ? req.user.toJSON() : {};
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  });

}

