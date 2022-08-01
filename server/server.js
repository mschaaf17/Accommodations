const express = require('express')
// add instant messaging
const io = require('socket.io')(3000)
io.on('connection', socket => {
    socket.emit('chat-message', 'Hello World')
})

// import ApolloServer
const {ApolloServer} = require('apollo-server-express')
const path = require('path')

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')
const {authMiddleware} = require('./utils/auth')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001;
// create a new apollo server and pass in our schema data
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

const app = express()

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