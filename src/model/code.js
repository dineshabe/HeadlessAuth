const mongoose = require('mongoose')

const codeSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true
    },
    requestingDevice: {
        type: Object,
        require: true
    },
    responderDevice: {
        type: Object,
        require: true
    },
    accessToken: {
        type: String
    }
})

const Code = mongoose.model('Code', codeSchema)

module.exports = Code