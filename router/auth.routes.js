const { Router } = require("express")
const { register, login, verify } = require("../controller/auth.controller")
const authValidationMiddleware = require("../middleware/auth.validation.middleware")




const AuthRouter = Router()

AuthRouter.post("/register", authValidationMiddleware, register)
AuthRouter.post("/verify", verify)
AuthRouter.post("/login", login)

module.exports = AuthRouter