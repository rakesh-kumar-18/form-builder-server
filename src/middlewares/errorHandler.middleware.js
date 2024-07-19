const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const success = err.success || false;

    res.status(statusCode).json({
        statusCode,
        message,
        success,
        stack: process.env.NODE_ENV === "development" ? err.stack : "",
    });
};

export default errorHandler;
