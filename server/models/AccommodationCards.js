const { Schema, model} = require('mongoose')

const accommodationCardsSchema = new Schema(
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
        
    },
    {
    toJSON: {
        getters: true
    }
}
)


const AccommodationCards = model('AccommodationCards', accommodationCardsSchema)
module.exports = AccommodationCards