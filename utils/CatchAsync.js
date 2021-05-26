// Ignore this file its still in the development proccess

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
