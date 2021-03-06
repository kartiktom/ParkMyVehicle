var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
var fs = require('fs');
var app = express();
const PORT = process.env.PORT || 9000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// if (process.env.NODE_ENV === 'production')
{app.use('/', express.static(path.join(__dirname, '/client/build')));}
//DATABASE CONNECTION

mongoose.connect(
  process.env.MONGODB_URL||
  'mongodb+srv://kartik:kartik@cluster0.ei41c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true});

fs.readdirSync('./routes').map((r) => app.use('/', require(`./routes/${r}`)))

// if (process.env.NODE_ENV === 'production')
// {
//   app.use(express.static('/client/build'));
   app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
// }

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
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
// module.exports = app;
