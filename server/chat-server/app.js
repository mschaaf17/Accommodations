var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);




const {ApolloServer} = require('apollo-server-express')


// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('../schemas')
const {authMiddleware} = require('../utils/auth')
const db = require('../config/connection')

const PORT = process.env.PORT || 3001;
// create a new apollo server and pass in our schema data
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})


app.use(express.urlencoded({extended: false}))
app.use(express.json())
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

// create a new instance of an Apollo server with the GraphQl schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start()
    // integrate our Apollo server witht he express application as middleware
    server.applyMiddleware({ app })


db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
        // log where we cna go to test our GQL API
        console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`)
    })
})
}

// call the async function to start the server
startApolloServer(typeDefs, resolvers) 

module.exports = app;
