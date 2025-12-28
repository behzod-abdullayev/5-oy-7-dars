const Joi = require("joi");

exports.AuthValidator = function (data) {
    try {
        const schema = Joi.object({
            username: Joi.string().trim().required(),
            email: Joi.string().max(50).min(10).trim().required(),
            password: Joi.string().min(8).max(100).trim().required()
        })
        return schema.validate(data)
    }catch (error) {
     return res.status(500).json({
        message: error.message
     })
    }
}