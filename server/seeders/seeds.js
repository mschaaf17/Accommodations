// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const accommSeeds = require('./accommSeed.json');
const db = require('../config/connection');
const {AccommodationCards, User } = require('../models/index');

db.once('open', async () => {
  try {
    await AccommodationCards.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < accommSeeds.length; i++) {
      const { _id, accommAuthor } = await AccommodationCards.create(accommSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: accommAuthor },
        {
          $addToSet: {
            accommodations: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});