// routes/users.js
var express = require('express');
var router = express.Router();
var knex = require('../config/db');

// =========AUTHORIZATION MIDDLEWARE=======
// Beautiful middleware syntax, if you are not authenticated then redirect, otherwise proceed with next
var loginRequired = function(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('message', 'Must be authenticated');
    return res.redirect("login");
  }
  next()
};

// INSERT IN MIDDLEWARE BETWEEN URL AND REQUEST CALLBACK


/* GET users listing. */
router.get('/', loginRequired, function(req, res, next) {
  knex("users")
    .then(data => {
      res.send(data);
    }, next)
});

module.exports = router;
