const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const outOfSeatSchema = require('./OutOfSeat')
const accommodationSchema = require('./Accommodations')
//import moment from 'moment'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        accommodationCards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'AccommodationCards'
            }
        ],
        accommodations: [accommodationSchema],
        students: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ],
        breaks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Break'
            }
        ],
        seatAwayTaken: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SeatAway'
            }
        ],
        seatAwayCountByDay: [
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
       
        //out of seat is teacher logging for student
        outOfSeat: [outOfSeatSchema],
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
          virtuals: true
        }
      }
)

userSchema.virtual('studentCount').get(function(){
    return this.students.length;
})
userSchema.virtual('breakCount').get(function() {
    return this.breaks.length;
})
userSchema.virtual('seatAwayCount').get(function() {
    return this.seatAwayTaken.length;
})

userSchema.virtual('outOfSeatCount').get(function() {
    return this.outOfSeat.length;
})



// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next()
})

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User;