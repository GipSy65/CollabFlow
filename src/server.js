require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const {initializeSocket} = require("./sockets/socket");
const helmet = require("helmet");


const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");


const app = express();
const server = http.createServer(app);

initializeSocket(server);


//Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", "ws://localhost:5000"],
      },
    },
  })
);

app.get("/", (req, res) => {
  res.send("CollabFlow Backend server is running");
});


app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/project", projectRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database Synced");
}).catch((err) => {
  console.error("Error syncing database", err);
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);


});

module.exports = app;