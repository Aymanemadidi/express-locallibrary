let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let catalogRouter = require('./routes/catalog');
let compression = require('compression');
let helmet = require('helmet');

let app = express();

app.use(helmet());

//Set up mongoose connection
let mongoose = require('mongoose');
let dev_db_url = 'mongodb://aymanelmadidi:locallibraryalgtop1@cluster0-shard-00-00.6d4bv.mongodb.net:27017,cluster0-shard-00-01.6d4bv.mongodb.net:27017,cluster0-shard-00-02.6d4bv.mongodb.net:27017/local_library?ssl=true&replicaSet=atlas-kuqv67-shard-0&authSource=admin&retryWrites=true&w=majority'
let mongoDB = process.env.MONGODB_URI || dev_db_url;
//let mongoDB = 'mongodb+srv://aymanelmadidi:locallibraryalgtop1@cluster0.6d4bv.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); //Compress all routes

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
