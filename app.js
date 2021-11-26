const express = require('express');
const recordRouter = require('./routes/record-routes');
const globalErrorHandler = require('./controllers/error-controller');
const AppError = require('./utils/app-error');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json({ limit: '15kb' }));
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/records', recordRouter);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
