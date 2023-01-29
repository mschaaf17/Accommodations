const { Schema, model} = require('mongoose')
const dateFormat = require('../utils/dateFormat');
// const breakSchema = require('./Break')

const AccommodationSchema = new Schema(
    {
        title: {
            type: String
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
        // breaks: [breakSchema]
        // breaks: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Break'
        //     }
        // ]
    },
    {
    toJSON: {
        getters: true
    }
}
)

// AccommodationSchema.virtual('breakCount').get(function() {
//     return this.breaks.length;
// })

const Accommodation = model('Accommodation', AccommodationSchema)
module.exports = Accommodation