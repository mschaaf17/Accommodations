const { AuthenticationError } = require('apollo-server-express')
const { User, Accommodation, AccommodationCards, Break , OutOfSeat, SeatAway, InterventionList} = require('../models');
const { signToken } = require('../utils/auth');
const moment = require('moment')
const { startOfDay, endOfDay, isEqual } = require('date-fns');



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
                .populate('outOfSeat')
                .populate('userInterventions')

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
          .populate('students')
          .populate('outOfSeat')
          .populate('userInterventions')
         
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
       interventionList: async () => {
        return InterventionList.find();
       }
       
      
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
              const user = await User.findOne({ username: username });
          
              // Check if the accommodation already exists for the student
              const accommodationExists = user.accommodations.some(
                (acc) => acc.title === title
              );
              if (accommodationExists) {
                throw new Error(`Accommodation '${title}' is already added for the student.`);
              }
          
              user.accommodations.push(accommodation);
              const updatedUser = await user.save();
          
              return updatedUser;
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

          addIntervention: async (parent, args) => {
            const interventions = await InterventionList.create(args);
      
            return { interventions };
          },

          removeIntervention: async (parent, args) => {
            const intervention = await InterventionList.findByIdAndDelete(args);
            console.log(intervention)
    
            return intervention;
    
          throw new AuthenticationError('Could not delete accommodation card');
        },
        addInterventionToStudent: async (parent, { title, username, functions, summary }, context) => {
          if (context.user && context.user.isAdmin) {
            const intervention = {title, functions, summary} ; 
            const user = await User.findOne({ username: username });
        
            // Check if the intervention already exists for the student
            const interventionExists = user.userInterventions.some(
              (a) => a.title === title
            );
            if (interventionExists) {
              throw new Error(`Intervention '${title}' is already added for the student.`);
            }
        
            user.userInterventions.push(intervention);
            const updatedUser = await user.save();
        
            return updatedUser;
          }
        
          throw new AuthenticationError('You need to be logged in as an administrator!');
        },
        removeInterventionFromStudent: async (parent, {interventionId, username}, context) => {
          if (context.user && context.user.isAdmin) {
            const user = await User.findOneAndUpdate(
              { username: username},
              {$pull: {userInterventions: {_id: interventionId}}},
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
          removeStudentFromList: async (parent, { studentId }, context) => {
            if (context.user && context.user.isAdmin) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { students:  studentId }},
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
            if (context.user && context.user.isAdmin) {
              const { studentId, ...seatAwayData } = args;
          
              const updatedSeatAway = await SeatAway.create({
                ...seatAwayData,
                username: context.user.username,
              });
          
              await User.findByIdAndUpdate(
                { _id: studentId },
                {
                  $push: { seatAwayTaken: updatedSeatAway._id },
                  $inc: { seatAwayTotalCount: 1 },
                  $inc: { 'seatAwayCountByDay.$[elem].count': 1 },
                },
                {
                  new: true,
                  runValidators: true,
                  arrayFilters: [
                    {
                      'elem.date': {
                        $eq: {
                          $dateToString: { format: '%Y-%m-%d', date: args.createdAt },
                        },
                      },
                    },
                  ],
                }
              );
          
              console.log(updatedSeatAway);
          
              return updatedSeatAway;
            }
          
            throw new AuthenticationError('You need to be logged in as an admin!');
          },
          
          
          addOutOfSeat: async (parent, { username, createdAt }, context) => {
            if (context.user) {
              const query = { username };
              const update = {
                $push: { outOfSeat: { createdAt, username} },
                $inc: { "outOfSeatCountByDay.$[elem].count": 1 },
              };
          
              if (createdAt) {
                const startOfDay = moment(createdAt).startOf('day');
                const endOfDay = moment(createdAt).endOf('day');

                query['outOfSeatCountByDay.createdAt'] = { $gte: startOfDay, $lte: endOfDay };
              }
          
              const options = {
                new: true,
                runValidators: true,
                arrayFilters: [{ "elem.createdAt": { $gte: startOfDay, $lte: endOfDay } }],
              };
          
              const updatedOutOfSeat = await User.findOneAndUpdate(query, update, options);
              console.log(updatedOutOfSeat);
          
              return updatedOutOfSeat;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          
        
          
    }
}

module.exports = resolvers