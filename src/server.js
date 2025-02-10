require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");


const app = express();



//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CollabFlow Backend server is running");
});

app.use("/users", userRoutes);
console.log("User Routes Loaded");


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});