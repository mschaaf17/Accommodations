const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat');



const outOfSeatSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
           get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String
        },
        outOfSeatCountByDay: [
            {
                date: {
                    type: Date,
                    require: true,
                },
                count: {
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        ],
    },
    {
    toJSON: {
        getters: true
    }
}
)

//const OutOfSeatSchema = model('OutOfSeat', outOfSeatSchema)
module.exports = outOfSeatSchema