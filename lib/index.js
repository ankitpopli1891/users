let createError = require('http-errors');
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// require('./routes')(app);
app.use('/api', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'dev' ? err : {}
    });
});

app.listen(port, () => {
    console.log('Magic happens on port ' + port);
});

module.exports = app;
