// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const accommSeeds = require('./accommSeed.json');
const db = require('../config/connection');
const { AccommodationCards, User } = require('../models/index');

async function dropIndexes() {
  try {
    const userIndexes = await User.collection.listIndexes().toArray();
    const accommodationsIndexExists = userIndexes.some(index => index.name === 'accommodations.title_1');
    const userInterventionsIndexExists = userIndexes.some(index => index.name === 'userInterventions.title_1');

    if (accommodationsIndexExists) {
      await User.collection.dropIndex('accommodations.title_1');
      console.log('Accommodations index dropped successfully');
    } else {
      console.log('Accommodations index does not exist');
    }

    if (userInterventionsIndexExists) {
      await User.collection.dropIndex('userInterventions.title_1');
      console.log('UserInterventions index dropped successfully');
    } else {
      console.log('UserInterventions index does not exist');
    }
  } catch (err) {
    console.error('Error dropping indexes:', err);
    process.exit(1); // Exit script if dropping indexes fails
  }
}

async function seedData() {
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

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

// Wait for database connection to open before dropping indexes and seeding data
db.once('open', async () => {
  await dropIndexes(); // Drop indexes before seeding data
  await seedData(); // Seed data after dropping indexes
});