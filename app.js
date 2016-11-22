var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Require npm packages for authentication
var session = require("express-session");
var RedisStore = require('connect-redis')(session)
var passport = require('passport');
var flash    = require('connect-flash');


var index = require('./routes/index');
var users = require('./routes/users');
var pagesRoutes = require('./routes/pages');
var authRoutes = require('./routes/auth');

var app = express();

// view engine setup
// ===EXPRESS-HANDLEBARS VIEW===
app.engine('hbs', require('express-handlebars')({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ======PASSPORT AND SESSIONS MIDDLEWARE========
app.use(session({store: new RedisStore(), secret: "i love dogs", resave: false, saveUnitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ===Custom setting res.locals to objects accessible across all views. Best apply this to our application.layout file. Remember to put after session
app.use(function (req, res, next) {
   res.locals = {
     global: 'Dynamic on all templates',
     user: req.isAuthenticated()
   };
   next();
});

// ===SASS MIDDLEWARE===
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed'
}));

// ===ROUTES===
app.use('/', index);
app.use('/users', users);
app.use(pagesRoutes);
app.use(authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
