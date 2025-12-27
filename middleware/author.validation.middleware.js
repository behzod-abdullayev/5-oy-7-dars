const CustomErrorHandler = require("../utils/custom-error-handler")
const { AuthorValidator } = require("../validator/author.validator")

module.exports = function (req, res, next) {
    const {error} = AuthorValidator(req.body)

    if (error) {
     throw CustomErrorHandler.BadRequest(error.message) 
    }
    next()
}