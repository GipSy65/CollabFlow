const { io } = require("socket.io-client");


const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to WebSocket server ");

    
    socket.on("newTask", (task) => {
        console.log("New Task Created:", task);
    });

    socket.on("taskUpdated", (task) => {
        console.log("Task Updated:", task);
    });

    socket.on("taskAssigned", (data) => {
        console.log("Task Assigned:", data);
    });

    socket.on("taskDeleted", (taskId) => {
        console.log("Task Deleted:", taskId);
    });
});

socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server ");
});
