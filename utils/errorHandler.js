// Creating a ErrorHandler class in JS

class ErrorHandler {
    // Constructor is a function in JS which runs everytime the object of that class is created that's why the name constructor :P
    // Taking two arguments - status, message
    constructor(message) {
        // this refers to the object
        // this.status = status;
        this.message = message;
    }

    // Static functions are used to optimise the memmory that is utilized in the error handling
    // And these function can only be called or used as a method on that particular class
    // Error handlers have their self explanatory name and operations 

    static validationError(message = "All fields are required") {
        const validateErr = new ErrorHandler(message);
        return validateErr.message;
    }

    static notFoundError(message = "Not Found") {
        const notFoundErr = new ErrorHandler(message);
        return notFoundErr.message;
    }

    static serverError(message = "Something went wrong") {
        const serverErr = new ErrorHandler(message);
        return serverErr.message;
    }

    static forbidden(message = "Not authorized") {
        const forbiddenErr = new ErrorHandler(message);
        return forbiddenErr.message;
    }
}

module.exports = ErrorHandler;
