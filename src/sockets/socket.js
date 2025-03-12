const socketIo = require("socket.io");
const { get } = require("../routes/userRoutes");

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ['websocket', 'polling'],
    });
    console.log("Socket.io initialized");

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("testEvent", (data) => {
            console.log("Received testEvent:", data);
            socket.emit("serverMessage", "Hello from server!");
        });

        socket.on("newTask", (task) => {
            console.log("New Task Received:", task);
            io.emit("taskUpdated", task);
        });

        socket.on("updateTask", (task) => {
            console.log("Task Updated:", task);
            io.emit("taskUpdated", task);
        });

        socket.on("deleteTask", (taskId) => {
            console.log("Task Deleted:", taskId);
            io.emit("taskDeleted", taskId);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });
}

const getSocketIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};

module.exports = { initializeSocket, getSocketIo };