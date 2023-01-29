const { AuthenticationError } = require('apollo-server-express')
const { User, Accommodation, Break , OutOfSeat} = require('../models')
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('accommodations')
                .populate('breaks')

                return userData
            }
            throw new AuthenticationError('Not logged in')
        },
       
       users: async () => {
        return User.find()
        .select('-__v -password')
       },
       user: async (parent, { username }) => {
        return User.findOne({ username })
        .select('-__v -password')
        .populate('accommodations')
        .populate('breaks')
       },
       accommodations: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Accommodation.find(params).sort({ createdAt: -1})
       },
       accommodation: async(parent, { _id}) => {
        return Accommodation.findOne({_id})
       },
       break: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Break.find(params).sort({ createdAt: -1})
       },
       outOfSeatQuery: async (parent, { username }) => {
        const params = username ? { username } : {};
        return OutOfSeat.find(params).sort({ createdAt: -1})
       },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
          login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          addAccommodation: async (parent, args, context) => {
            if (context.user) {
              const accommodation = await Accommodation.create({ ...args, username: context.user.username });
      
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { accommodations: accommodation._id } },
                { new: true }
              );
              console.log(accommodation)
      
              return accommodation;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
          addBreak: async (parent, args, context) => {
            if (context.user) {
              const updatedBreak = await Break.create({ ...args, username: context.user.username });
      
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { breaks: updatedBreak._id } },
                { new: true, runValidators: true }
              );
              console.log(updatedBreak)
      
              return updatedBreak;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
          addOutOfSeat: async (parent, args, context) => {
            if (context.user) {
              const updatedOutOfSeat = await OutOfSeat.create({ ...args, username: context.user.username });
      
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { outOfSeat: updatedOutOfSeat._id } },
                { new: true, runValidators: true }
              );
              console.log(updatedOutOfSeat)
      
              return updatedOutOfSeat;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
            
          
    }
}

module.exports = resolvers