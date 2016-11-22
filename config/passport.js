var bcrypt = require('bcrypt-nodejs');
var knex = require('./db.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require("passport-github2").Strategy

// ==========USER LOGIN AUTHENTICATION===========
passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    knex("users")
      .where("email", username)
      .first()
      .then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)){
          return done(null, false, req.flash('message', 'Invalid email or password'));
        }
        return done(null, user, req.flash('message', 'Succesfully logged in'))
      }, done)
  }
));

// ==========USER SIGN UP AND HASH PASSWORD===========
passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    knex("users")
      .where("email", username)
      .first()
      .then(user => {
        if (user){
          return done(null, false, req.flash('message', 'Email taken'));
        }
        if (password !== req.body.password2) {
          return done(null, false, req.flash('message', 'Passwords do not match'));
        }

        var newUser = {
          email: username,
          password: bcrypt.hashSync(password),
          name: req.body.name
        };

        knex("users")
          .insert(newUser)
          .then(ids => {
            newUser.id = ids[0];
            return done(null, newUser, req.flash('message', 'Succesfully created'));
          }, done)
      }, done)
  }
));

// ======OAUTH GITHUB LOGIN STRATEGY REFER passportjs.org=========
passport.use(new GitHubStrategy({
  // Copy and paste from passport-github2 github repo. Then go on github and configure clientID and clientSecret by registering an app https://github.com/settings/applications/new
    clientID: '2e5f40e551b5ed1a1637',
    clientSecret: '656d1285badbd994a0d7c0b0efef03b0c049c7e3',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    knex("users")
      .where("oauth_provider", "github")
      .where("oauth_id", profile.username)
      .first()
      .then((user) => {
        if (user) {
          return done(null, user)
        }

        var newUser = {
          oauth_provider: "github",
          oauth_id: profile.username,
        };

        return knex("users")
          .insert(newUser)
          .then((ids) => {
            newUser.id = ids[0]
            done(null, newUser)
          })
      })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  knex("users")
    .where("id", id)
    .first()
    .then(user => {
      return done(null, user)
    }, done)
});
