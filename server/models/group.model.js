const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        enum: ['Frontend', 'Backend', 'Design', 'Python'],
        required: true
    }
})

module.exports = model('Group', groupSchema)