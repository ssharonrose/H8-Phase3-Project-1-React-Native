async function errorHandler(err, request, response, next) {
    console.log(err);
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        response.status(400).json({
            message: err.errors[0].message
        })
    } else if (err.name === "Unauthenticated") {
        response.status(401).json({
            message: "Please login first"
        })
    } else if (err.name === "InvalidUser") {
        response.status(401).json({
            message: "Please register first or invalid email"
        })
    } else if (err.name === "InvalidPassword") {
        response.status(401).json({
            message: "error invalid password"
        })
    } else if (err.name === "NotFound") {
        response.status(401).json({
            message: "Error login user not found"
        })
    } else if (err.name === "ImgLessThan3") {
        response.status(401).json({
            message: "Please provide three image URLs"
        })
    } else if (err.name === "JsonWebTokenError" || err.name === "Unauthorized") {
        response.status(401).json({
            message: "Invalid Token"
        })
    } else if (err.name === "Forbidden") {
        response.status(403).json({
            message: "Forbidden"
        })
    } else if (err.name === "NotFound") {
        response.status(404).json({
            message: `Not found`
        })
    } else {
        console.log(err);
        response.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = { errorHandler }