const { Schema, model} = require('mongoose')
const dateFormat = require('../utils/dateFormat');


const userInterventionsSchema = new Schema(
    {
        functions: {
            type: String
        },
        title: {
            type: String,
            unique: true, 
          },
        
        username: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
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


module.exports = userInterventionsSchema