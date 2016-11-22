var express = require('express');
var router = express.Router();
var passport = require('passport');
var knex = require('../config/db');
require('../config/passport.js');

router
  .get('/signup', function(req, res, next) {
    res.render('auth/signup', {
      message: req.flash('message')
    });
  })
  .post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }))
  .get('/login', function(req, res, next) {
    res.render('auth/login', {
      message: req.flash('message')
    });
  })
  .post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  .get('/logout', function(req, res, next) {
    req.logout();
    req.flash('message', 'Succesfully logged out');
    res.redirect('/');
  })
  .get('/auth/github',passport.authenticate('github', {
      scope: [ 'user:email' ]
  }))
  .get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/login' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
