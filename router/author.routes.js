const {Router} = require("express")
const { getAllAuthors, addAuthor, getOneAuthor, updateAuthor, deleteAuthor, search, updateadmin } = require("../controller/auther.controller")
const authorValidationMiddleware = require("../middleware/author.validation.middleware")
const { authorization, authorization2 } = require("../middleware/authorization")


const AuthorRouter = Router()

AuthorRouter.get("/get_all_authors", getAllAuthors)
AuthorRouter.get("/get_one_author/:id", getOneAuthor)
AuthorRouter.get("/search", search)
AuthorRouter.post("/add_author", authorValidationMiddleware, authorization, authorization2, addAuthor )
AuthorRouter.put("/update_author/:id", authorization, authorization2, updateAuthor)
AuthorRouter.delete("/delete_author/:id", authorization, authorization2, deleteAuthor)


//super admin uchun
AuthorRouter.put("/update_user/:id", updateadmin);

// AuthorRouter.put("/update_user/:id", authorization2, updateadmin); bu korinishda yani authorization2 ni ishlatih uchun suoer admin kerak yani agar super admin qoshsangiz va auhorization 2 ni ishlatsangiz faqatgin superadmin role ni ozgartia oladigan bo'ladi

module.exports = AuthorRouter