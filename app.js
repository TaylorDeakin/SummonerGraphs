var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var grouping = require('handlebars-plugin-grouping');
var expressSession = require('express-session');
var hbshelpers = require('./handlebarsHelpers');

var app = express();

var handlebars = require('express-handlebars').create({
    helpers: {
        grouping: grouping,
        matchedSelect: hbshelpers.matchedSelect
        
    },
    defaultLayout: 'main',
    extname: '.handlebars'
});

// view engine setup
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'atokenofatonement12345'
}));
/*
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
*/
app.use(express.static(path.join(__dirname, 'public')));
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
/*
var initPassport = require('./passport/init');
initPassport(passport);
*/
var routes = require('./routes/index');
//var admin = require('./routes/admin')(passport);

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
