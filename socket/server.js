import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const PORT = 3001;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods:["GET","POST"]
  },
});

app.use(express.json());


io.on("connection", (socket) => {
 socket.on("joinRoom",(room,name)=>{
  socket.join(room);
  console.log()
 })
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});


// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
