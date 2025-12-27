const { Router } = require("express")
const { register, login, verify } = require("../controller/auth.controller")



const AuthRouter = Router()

AuthRouter.post("/register", register)
AuthRouter.post("/verify", verify)
AuthRouter.post("/login", login)

module.exports = AuthRouter