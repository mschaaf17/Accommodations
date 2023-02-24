const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat');


const seatAwaySchema = new Schema(
    {
        seatAwayClicked: {
            type: Boolean
        },
        seatAwayDate: {
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

const SeatAway = model('SeatAway', seatAwaySchema)
module.exports = SeatAway   