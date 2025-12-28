const { Router } = require("express")
const { addCitation, updateCitation, deleteCitation } = require("../controller/citation.controller")



const citationRouter = Router()

citationRouter.post("/add_citation", addCitation)
citationRouter.put("/update_citation", updateCitation)
citationRouter.delete("/delete_citation", deleteCitation)

module.exports = citationRouter