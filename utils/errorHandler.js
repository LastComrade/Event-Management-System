// Creating a ErrorHandler class in JS

class ErrorHandler {
    // Constructor is a function in JS which runs everytime the object of that class is created that's why the name constructor :P
    // Taking two arguments - status, message
    constructor(status, message) {
        // this refers to the object
        this.status = status;
        this.message = message;
    }

    // Static functions are used to optimise the memmory that is utilized in the error handling
    // And these function can only be called or used as a method on that particular class
    // Error handlers have their self explanatory name and operations 

    static validationError(message = "All fields are required") {
        return new ErrorHandler(422, message);
    }

    static notFoundError(message = "Not Found") {
        return new ErrorHandler(404, message);
    }

    static serverError(message = "Something went wrong") {
        return new ErrorHandler(500, message);
    }

    static forbidden(message = "Not authorized") {
        return new ErrorHandler(403, message);
    }
}

module.exports = ErrorHandler;
