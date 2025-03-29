const express = require('express');
const http = require('http');
const {Server} = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server (server)

app.use(express.static("public"));
let players = {}

io.on('connection', (socket)=>{
    console.log("a player connected with id:", socket.id)

    // assigning the player a bird each either left or right
    if(Object.keys(players).length === 0 ){
        players[socket.id] = {bird:"left"}
    } else if(Object.keys(players).length === 1){
        players[socket.id] = {bird: "right"}
    } else {
        // if 2 players have already entered in the game
        socket.emit('gameFull')
        socket.disconnect()
        return;
    }

    // Send assigned bird info to the player
    socket.emit("playerAssigned", players[socket.id]);

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A player disconnected:", socket.id);
        delete players[socket.id]; // Remove player from list
    });

})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname ,"public", "index.html"));
  });


server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});