const { AuthenticationError } = require('apollo-server-express')
const { User, Accommodation, Break , OutOfSeat, SeatAway} = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('accommodations')
                .populate('breaks')
                .populate('seatAwayTaken')

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
        .populate('seatAwayTaken')
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
       seatAway: async (parent, { username }) => {
        const params = username ? { username } : {};
        return SeatAway.find(params).sort({ createdAt: -1})
       },
      //  outOfSeatQuery: async (parent, { username }) => {
      //   const params = username ? { username } : {};
      //   return User.find(params).sort({ createdAt: -1})
      //  },
      //  outOfSeatToday: async (parent, { username, createdAt }) => {
      //   const params = username ? { username, createdAt} : {};
      //   return User.find(params).sort({ createdAt: -1})
      //  },
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
          //add accommodation is for the teacher to add specific acommodations
          // addAccommodation: async (parent, args, context) => {
          //   if (context.user) {
          //     const accommodation = await Accommodation.create({ ...args, username: context.user.username });
      
          //     await User.findByIdAndUpdate(
          //       { _id: context.user._id },
          //       { $push: { accommodations: accommodation._id } },
          //       { new: true }
          //     );
          //     console.log(accommodation)
      
          //     return accommodation;
          //   }
      
          //   throw new AuthenticationError('You need to be logged in!');
          // },
          //teacher has to add the accommodations for the student-- right now backend
          //is set up that the student has to be logged in to and add it for themselves
          addAccommodation: async (parent, {username, image, title}, context) => {
            if (context.user) {
              const accommodation = await User.findOneAndUpdate(
                {username: username},
                { $push: { accommodations: {title, image, username: context.user.username} } },
                { new: true, runValidators: true }
              );
              console.log(accommodation)
      
              return accommodation;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
          //not working correctly yet
          removeAccommodation: async (parent, args, context) => {
            if (context.user) {
              const accommodation = await User.findByIdAndDelete(
                // {_id: {accommodations: accommodation._id,}},
                { $pull: { accommodations: accommodation._id }},
                { new: true, runValidators: true }
              );
              console.log(accommodation)
      
              return accommodation;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
          //add break comes from the student
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
          //add seat away comes from the student-- will need to be connected to accommodation card
          addSeatAway: async (parent, args, context) => {
            if (context.user) {
              const updatedSeatAway = await SeatAway.create({ ...args, username: context.user.username });
      
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { seatAwayTaken: updatedSeatAway._id } },
                { new: true, runValidators: true }
              );
              console.log(updatedSeatAway)
      
              return updatedSeatAway;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
           addSeatAway: async (parent, args, context) => {
            if (context.user) {
              const updatedSeatAway = await SeatAway.create({ ...args, username: context.user.username });
      
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { seatAwayTaken: updatedSeatAway._id } },
                { new: true, runValidators: true }
              );
              console.log(updatedSeatAway)
      
              return updatedSeatAway;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
          //out of seat comes from teacher logging
          addOutOfSeat: async (parent, {username, createdAt}, context) => {
           if(context.user){
            
              const updatedOutOfSeat = await User.findOneAndUpdate(
                {username: username},
                {$push: {outOfSeat: {createdAt, username: context.user.username}}},
                {new: true, runValidators: true}
                )      
              console.log(updatedOutOfSeat)
      
              return updatedOutOfSeat;
              }
      
            throw new AuthenticationError('You need to be logged in!');
          },
            
          
    }
}

module.exports = resolvers