import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import agentsRouter from './routes/agents.js';
import employeesRouter from './routes/employees.js';
import accountsRouter from './routes/accounts.js';
import uploadsRouter from './routes/uploads.js';
import payrollRouter from './routes/payroll.js';

import database from './config/database.js';
const { connectDB } = database;

const app = express();

// view engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

// Connect to database
connectDB();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/agents', agentsRouter);
app.use('/employees', employeesRouter);
app.use('/accounts', accountsRouter);
app.use('/uploads', uploadsRouter);
app.use('/payroll', payrollRouter);

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

export default app;
