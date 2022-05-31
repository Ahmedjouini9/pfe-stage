const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config(); 



const app = express()

mongoose.connect(process.env.MONGO_URL,
   { 
   useNewUrlParser: true,
   useUnifiedTopology: true,
  // useCreateIndex: true
  // useFindAndModify: true,
   }
  )
        .then(()=>console.log('dataBase Connected'))
        .catch(()=>console.log('dataBase Connection Failed !'))

app.use(
        cookieSession({ name: "session", keys: ["rca"], maxAge: 24 * 60 * 60 * 100 })
              );
app.use(express.static(path.join(__dirname, '../public')));        
app.use(passport.initialize());
app.use(passport.session());  
 app.use(
         cors({
                   origin: "http://localhost:3000",
                   methods: "GET,POST,PUT,DELETE",
                   credentials: true,
                 })
               );


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/user",require('./routes/usersRouter'))
app.use("/company",require('./routes/companysRouter'))
app.use("/posts", require('./routes/postsRouter'));
app.use("/conversation", require('./routes/conversationRouter'));
app.use("/message", require('./routes/messageRouter'));


//Real Time Chat!!
const server = http.createServer(app);
const io = socketio(server);

      let users = [];
      
const addUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) &&
          users.push({ userId, socketId });
      };
      
const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
      };
      
const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
      };
      
      io.on("connection", (socket) => {
        //when ceonnect
        console.log("a user connected.");
      
        //take userId and socketId from user
        socket.on("addUser", (userId) => {
          addUser(userId, socket.id);
          io.emit("getUsers", users);
        });
      
        //send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
          const user = getUser(receiverId);
          io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
          });
        });
      
        //when disconnect
        socket.on("disconnect", () => {
          console.log("a user disconnected!");
          removeUser(socket.id);
          io.emit("getUsers", users);
        });
      });

app.listen(process.env.PORT || 5000,()=>console.log(`server is running on port ${process.env.PORT}`));