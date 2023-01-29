const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat');


const breakSchema = new Schema(
    {
        breakTaken: {
            type: Boolean
        },
        breakDate: {
            type: Date,
            default: Date.now
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String
        }
    },
    {
    toJSON: {
        getters: true
    }
}
)

const Break = model('Break', breakSchema)
module.exports = Break