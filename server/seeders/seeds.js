// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const accommSeeds = require('./accommSeed.json');
const db = require('../config/connection');
const { AccommodationCards, User } = require('../models/index');

async function resetData() {
  try {
    // Drop existing collections to remove all data
    await User.deleteMany({});
    await AccommodationCards.deleteMany({});

    // Drop existing indexes
    await dropIndexes();

    // Seed data after dropping indexes
    await seedData();

    console.log('Data reset successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error resetting data:', err);
    process.exit(1);
  }
}






// async function resetData() {
//   try {
//       // Drop existing collections to remove all data
//       await User.deleteMany({});
//       await AccommodationCards.deleteMany({});

//       // Call your seeding function to insert fresh data
//       //await seedData();

//       console.log('Data reset successfully!');
//       process.exit(0);
//   } catch (err) {
//       console.error('Error resetting data:', err);
//       process.exit(1);
//   }
// }

// // Wait for database connection to open before resetting data
// db.once('open', async () => {
//   await resetData(); // Reset data after database connection is established
// });



async function dropIndexes() {
  try {
    const userIndexes = await User.collection.listIndexes().toArray();
    const accommodationsIndexExists = userIndexes.some(index => index.name === 'userAccommodations.title_1');
    const userInterventionsIndexExists = userIndexes.some(index => index.name === 'userInterventions.title_1');

    if (accommodationsIndexExists) {
      await User.collection.dropIndex('userAccommodations.title_1');
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

// async function seedData() {
//   try {
//     //await AccommodationCards.deleteMany({});
//     //await User.deleteMany({});
    
//     await User.create(userSeeds);

//     for (let i = 0; i < accommSeeds.length; i++) {
//       const { _id, accommAuthor } = await AccommodationCards.create(accommSeeds[i]);
//       const user = await User.findOneAndUpdate(
//         { username: accommAuthor },
//         {
//           $addToSet: {
//             userAccommodations: _id,
//           },
//         }
//       );
//     }

//     console.log('Data seeded successfully!');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error seeding data:', err);
//     process.exit(1);
//   }
// }
async function seedData() {
  try {
    // Create users
    await User.create(userSeeds);
    const mikeUser = await User.findOne({ username: "mike"})

    // Create accommodation cards
     // Create accommodation cards
     const createdAccommodations = await AccommodationCards.create(accommSeeds.map(seed => ({
      ...seed,
      username: mikeUser._id  // Associate the accommodation card with user "mike"
    })));

    // await createdAccommodations.save();
    // // Loop through each user and assign random accommodation cards
    // const users = await User.find({});
    // users.forEach(async (user) => {
    //   const randomAccommodations = getRandomAccommodations(createdAccommodations);
    //   user.userAccommodations = randomAccommodations.map(accommodation => accommodation._id);
    //   await user.save();
    // });

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

// Function to get a random subset of accommodation cards
// function getRandomAccommodations(accommodations) {
//   const numToSelect = Math.floor(Math.random() * (accommodations.length + 1)); // Randomly select up to all accommodations
//   return accommodations.slice(0, numToSelect);
// }


// // Wait for database connection to open before dropping indexes and seeding data
// db.once('open', async () => {
//   await dropIndexes(); // Drop indexes before seeding data
//   await seedData(); // Seed data after dropping indexes
// });


db.once('open', async () => {
  await resetData(); // Reset data after database connection is established
});