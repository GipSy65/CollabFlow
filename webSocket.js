const io = require("socket.io-client");
const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log(" Connected to Socket.io server!", socket.id);
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});

socket.on("serverMessage", (msg) => {
    console.log("Message from server:", msg);
});

// Send a test event
socket.emit("testEvent", { message: "Hello from client!" });
