const { Schema, model} = require('mongoose')

const interventionListSchema = new Schema(
    {
        functions: {
            type: String
        },
        title: {
            type: String
        },
        username: {
            type: String
        },
        summary: {
            type: String
        }
        
    },
    {
    toJSON: {
        getters: true
    }
}
)


const InterventionList = model('InterventionList', interventionListSchema)
module.exports = InterventionList 