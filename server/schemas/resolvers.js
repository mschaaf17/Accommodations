const { AuthenticationError } = require('apollo-server-express')
const { User, Accommodation, AccommodationCards, Break , OutOfSeat, SeatAway} = require('../models');
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
                .populate('isAdmin')
                .populate('students')

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
        .populate('isAdmin')
       },
       accommodationCards: async () => {
        return AccommodationCards.find()
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
          //add an accommodation card for all users
          addAccommodationCard: async (parent, args) => {
            const accommodationCards = await AccommodationCards.create(args);
      
            return { accommodationCards };
          },

          addAccommodationForStudent: async (parent, { username, image, title }, context) => {
            if (context.user && context.user.isAdmin) {
              const accommodation = { title, image }; 
              const user = await User.findOneAndUpdate(
                { username: username },
                { $push: { accommodations: accommodation } },
                { new: true, runValidators: true }
              );
          
              if (!user) {
                throw new AuthenticationError('Incorrect credentials');
              }
          
              return user; 
            }
          
            throw new AuthenticationError('You need to be logged in as an administrator!');
          },
          
          removeAccommodationCard: async (parent, args) => {
              const accommodation = await AccommodationCards.findByIdAndDelete(args);
              console.log(accommodation)
      
              return accommodation;
      
            throw new AuthenticationError('Could not delete accommodation card');
          },
          
          removeAccommodationFromStudent: async (parent, {accommodationId, username}, context) => {
            if (context.user && context.user.isAdmin) {
              const user = await User.findOneAndUpdate(
                { username: username},
                {$pull: {accommodations: {_id: accommodationId}}},
                {new: true, runValidators: true}
              );
              if(!user){
                throw new AuthenticationError('Inccorrect username')
              }
              return user;
            }
      
            throw new AuthenticationError('You need to be logged in as an admin!');
          },
          addStudentToList: async (parent, { studentId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { students: studentId } },
                { new: true }
              ).populate('students');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in as an admin!');
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
          //  addSeatAway: async (parent, args, context) => {
          //   if (context.user) {
          //     const updatedSeatAway = await SeatAway.create({ ...args, username: context.user.username });
      
          //     await User.findByIdAndUpdate(
          //       { _id: context.user._id },
          //       { $push: { seatAwayTaken: updatedSeatAway._id } },
          //       { new: true, runValidators: true }
          //     );
          //     console.log(updatedSeatAway)
      
          //     return updatedSeatAway;
          //   }
      
          //   throw new AuthenticationError('You need to be logged in!');
          // },
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