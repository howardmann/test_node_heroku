/* Require this at the top of all of our route files, we use router so we can modularise our code */
var express = require('express');
var router = express.Router();

/* GET about and contacts page. */
router
  .get('/about', function(req, res, next) {
    res.render('pages/about', { someText: 'This is some dynamic content' });
  })
  .get('/contact', function(req, res, next) {
    res.render('pages/contact', { someArray: ['email@email.com', '123456', '123 fake street'], condition: true });
  });



module.exports = router;
