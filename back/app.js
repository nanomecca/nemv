var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const history = require('connect-history-api-fallback') //잘못된 url 처리
const cors = require('cors') //개발시 다른 서버에서의 요청시 데이터 전송


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') app.use(cors()) //개발시 다른 서버에서의 요청시 데이터 전송
app.use('/api', require('./routes/api'))  //api route생성
app.use(history())  //잘못된 url 처리
app.use(express.static(path.join(__dirname, '../front', 'dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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


const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name: { type: String, default: '', unique: true, index: true },
   age: { type: Number, default: 1 }
 })

const User = mongoose.model('/modules/User', userSchema)

mongoose.connect('mongodb://localhost:27017/nemv', { useNewUrlParser: true }, (err) => {
   if (err) return console.error(err)
   console.log('mongoose connected!')
})