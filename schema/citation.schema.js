
const { ref, required } = require("joi")
const {Schema, model} = require("mongoose")

const Citation = new Schema({
        text: {
            type: String
        },
        book_id: {
            type: Schema.ObjectId,
            ref: "Book",
            required: true
        },
        admin_id: {
            type: Schema.ObjectId,
            ref: "User",
            required: true
        }
},
{
    versionKey: false,
    timestamps: true
}
)
const citationSchema = model("Citation", Citation)
module.exports = citationSchema