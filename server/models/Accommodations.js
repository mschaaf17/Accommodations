const { Schema, model} = require('mongoose')
const dateFormat = require('../utils/dateFormat');
// const breakSchema = require('./Break')

const accommodationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
          },
          image: {
            type: String
        },
        username: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    
    },
    {
    toJSON: {
        getters: true
    }
}
)

module.exports = accommodationSchema