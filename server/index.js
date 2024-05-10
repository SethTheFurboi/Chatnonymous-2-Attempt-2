const express = require('express');
const app = express();
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const PORT2 = 4001
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors())
let users = []

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} connected`)  
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })
 
    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

  db.once('open', () => {
    app.listen(PORT2, () => {
      console.log(`API server running on port ${PORT2}!`);
      console.log(`Use GraphQL at http://localhost:${PORT2}/graphql`);
    });
  });
};

startApolloServer();

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});