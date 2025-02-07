require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CollabFlow Backend server is running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});