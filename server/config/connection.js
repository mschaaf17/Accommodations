const mongoose = require('mongoose')

// mongoose port name
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27018/inclusion-student-app',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

// // Connect to MongoDB
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Connection events
// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB');
// });

// mongoose.connection.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//     console.log('Disconnected from MongoDB');
// });


module.exports = mongoose.connection