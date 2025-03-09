// Mongodb Model example

const mongoose = require('mongoose')

const { Schema } = mongoose

const exampleSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    },
    { timestamps: true }

)

const Example = mongoose.model('Example', exampleSchema)

module.exports = {
    Example,
    exampleSchema
}