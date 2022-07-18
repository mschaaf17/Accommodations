const { Schema, model} = require('mongoose')


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
        }
    }
)

const Accommodation = model('Accommodation', AccommodationSchema)
module.exports = Accommodation