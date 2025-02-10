require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/User");

const userRoutes = require("./routes/userRoutes");


const app = express();



//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("CollabFlow Backend server is running");
});

app.use("/user", userRoutes);

sequelize.sync({alter: true,force:false}).then(() => {
  console.log("Database Synced");
}).catch((err) => {
  console.error("Error syncing database", err);
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, Email and Password are required" });
  }

  try {
    const user = await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Signup Error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});