const express = require('express');
var createError = require('http-errors')
var cors = require('cors');
const path = require('path');
var logger = require('morgan');

const app = express();
require('dotenv').config({ path: path.resolve(__dirname + '/.env') });

require('./app/config/db.config');

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/views', express.static(path.join(__dirname + '/views')));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send("Welcome to RestAPI")
});

require("./app/routes/index")(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return next(createError(404, "This resource was not found"));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(404).json({
    "status": false,
    "statuscode": err.status,
    "message": err.message
  });
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Connected..Server is running on port ${PORT}.`);
});