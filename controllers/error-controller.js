const AppError = require('./../utils/app-error');

const handleDuplicateFieldsDB = err => {
    // const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    // const message = `Duplicate field value: ${value}. Please use another value`;
    const message = `Serial key taken. Please use a different one`;
    return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const devErrors = (err, res) => {
    res.status(err.statusCode).json({
        error: err,
        stack: err.stack,
    });
}

const prodErrors = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
        });
    // Programming or other unknown error: don't leak error details
    } else {
        console.error('ERROR', err);

        res.status(500).json({
            message: 'Internal server error',
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        devErrors(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        // Duplicate field error (thrown from MongoDB driver)
        if (err.code === 11000) 
            err = handleDuplicateFieldsDB(err);

        // Validation error (thrown by mongoose)
        if (err.name === 'ValidationError')
            err = handleValidationErrorDB(err);

        prodErrors(err, res);
    }
};