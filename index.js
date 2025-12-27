const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const AuthorRouter = require("./router/author.routes")
const BookRouter = require("./router/book.routes")
const AuthRouter = require("./router/auth.routes")
const errorMiddleware = require("./middleware/error.middleware")
const router = require("./router/image.routes")
const path = require("path")
require("dotenv").config()


const app = express()

const PORT = process.env.PORT || 3000

app.use(cors({origin: true, credentials: true}))

app.use(express.json())

connectDB()


app.use("/images", express.static(path.join(__dirname, "rasm")));


//Router
app.use(AuthorRouter)
app.use(BookRouter)
app.use(AuthRouter)
app.use( router)


app.use(errorMiddleware)

app.listen( PORT, () => {
    console.log("server is running at:" + PORT);
}) 