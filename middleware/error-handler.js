const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode)
            .json({
                message: "something went wrong",
                error: err.message,
            })
    }

    res.status(500).json({
        message: "something went wrong",
    });
}

module.exports = errorHandlerMiddleware;