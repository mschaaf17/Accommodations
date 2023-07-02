const { Schema, model} = require('mongoose')
const dateFormat = require('../utils/dateFormat');
// const breakSchema = require('./Break')

const accommodationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true, // Ensure accommodation titles are unique within each student
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

// const Accommodation = model('Accommodation', AccommodationSchema)
// module.exports = Accommodation\
module.exports = accommodationSchema