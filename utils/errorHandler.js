class ErrorHandler {
    constructor(status, msg) {
        this.status = status;
        this.message = message;
    }

    static validationError(message = "All fields are required") {
        return new ErrorHandler(422, message);
    }

    static notFoundError(message = "Not Found") {
        return new ErrorHandler(404, message);
    }

    static serverError(message = "Internal Error") {
        return new ErrorHandler(500, message);
    }

    static forbidden(message = "Not authorized") {
        return new ErrorHandler(403, message);
    }
}

module.exports = ErrorHandler;
