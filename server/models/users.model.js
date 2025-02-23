const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    direction: {
        type: [String],
        enum: ['Frontend', 'Backend', 'Design', 'Python'],
        required: true
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    telegram_id: {
        type: String,
        required: true
    }
})

module.exports = model('User', userSchema)