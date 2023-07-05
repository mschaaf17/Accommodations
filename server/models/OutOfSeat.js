const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat');



const outOfSeatSchema = new Schema(
    {
        createdAt: {
            type: Date,
           default: Date.now,
           // get: timestamp => dateFormat(timestamp)
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


//const OutOfSeatSchema = model('OutOfSeat', outOfSeatSchema)
module.exports = outOfSeatSchema