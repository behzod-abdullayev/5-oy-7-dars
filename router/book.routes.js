const {Router} = require ("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook } = require("../controller/book.controller")
const bookValidationMiddleware = require("../middleware/book.validation.middleware")




const BookRouter = Router()

BookRouter.get("/get_all_books", getAllBooks)
BookRouter.get("/get_one_book/:id", getOneBook)
BookRouter.post("/add_book", bookValidationMiddleware, addBook)
BookRouter.put("/update_book/:id", updateBook)
BookRouter.delete("/delete_book/:id", deleteBook)


module.exports = BookRouter
