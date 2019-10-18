const mongoose = require('mongoose')

const subscriberScheme = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscriberDate: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subsucriber', subscriberScheme)