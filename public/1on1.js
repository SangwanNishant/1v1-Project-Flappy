const socket = io();
socket.on("connect", () => {
  console.log("Connected to server!");
});
socket.on("playerAssigned", (data) => {
    console.log("You are assigned as:", data.bird);
});

socket.on("gameFull", () => {
    alert("Game is full! Try again later.");
});