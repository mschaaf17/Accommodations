const moment = require('moment');
const User = require('../models/User'); 


async function initializeOutOfSeatCount() {
    console.log("this part is working" + User.find())
    const users = await User.find();
    
    users.forEach(async (user) => {
      const startOfToday = moment().startOf('day');
      const initialCountByDay = {
        date: startOfToday.toDate(),
        count: 0
      };
      user.outOfSeatCountByDay = [initialCountByDay];
      await user.save();
    });
  }

  initializeOutOfSeatCount()
  .then(() => {
    console.log('outOfSeatCountByDay initialized successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to initialize outOfSeatCountByDay:', error);
    process.exit(1);
  });

  