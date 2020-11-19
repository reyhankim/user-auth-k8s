const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

// create test user in db on startup if required
const testHelper = require('./helpers/testHelper');
testHelper.createTestUser()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use(errorHandler.handleError);

const port = "3000";
app.set('port', port);

module.exports = app;
