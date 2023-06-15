const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const outOfSeatSchema = require('./OutOfSeat')
const accommodationSchema = require('./Accommodations')
const moment = require('moment');
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
        hasBreaks: {
          type: Boolean,
          default: false
      },
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
        },
        outOfSeatCountByDay: [
            {
              date: {
                type: Date,
                required: true,
              },
              count: {
                type: Number,
                required: true,
                default: 0,
              },
            },
          ],
       
    },
    {
        toJSON: {
          virtuals: true
        },
        default: [],
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

userSchema.virtual('outOfSeatCountByDayVirtual').get(function () {
    const countsByDay = {};
  
    this.outOfSeat.forEach((item) => {
      const day = moment(item.createdAt).startOf('day').toISOString();
      countsByDay[day] = (countsByDay[day] || 0) + 1;
    });
  
    const outOfSeatCountByDay = Object.entries(countsByDay).map(([date, count]) => ({
      date,
      count,
    }));
  
    return outOfSeatCountByDay;
  });

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

userSchema.pre('save', function (next) {
    // Check if the outOfSeatCountByDay field is empty or not present
    if (!this.outOfSeatCountByDay || this.outOfSeatCountByDay.length === 0) {
      // Initialize the outOfSeatCountByDay field with appropriate dates
      const currentDate = moment().startOf('day');
      const dates = [];
  
      // Generate the dates for initialization (e.g., last 30 days)
      for (let i = 0; i < 30; i++) {
        dates.push({
          date: currentDate.toDate(),
          count: 0,
        });
        currentDate.subtract(1, 'day');
      }
  
      this.outOfSeatCountByDay = dates;
    }
  
    next();
  });
  

const User = model('User', userSchema)

module.exports = User;