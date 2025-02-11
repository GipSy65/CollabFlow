const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
require("dotenv").config();


const JWT_SECRET = process.env.JWT_JWT_SECRET;
const user = require("../models/User");

const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const verifyAuth = require("../middleware/authMiddleware");

router.get("/profile", verifyAuth, async (req, res) => {
   try{
    const userData = await user.findOne({ where: { email: req.user.email } });

    if(!userData){
        return res.status(404).json({ message: "User not found"});
    }
    res.json({message: "Welcome to CollabFlow", user: userData});
   }
   catch(err){
         res.status(500).json({message: "Profile Error", error: err.message});
    }
});

router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: "Email, Password and Name are required" });
    }
    try {
        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name
        });

        const newUser = await user.create({
            firebaseUid: userRecord.uid,
            name,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        const jwtToken = jwt.sign({
            id: newUser.id,
            role: newUser.role, email
        }, process.env.JWT_SECRET, { expiresIn: "3h" });

        const firebaseToken = await admin.auth().createCustomToken(userRecord.uid);

        return res.status(201).json({ message: "User created successfully", user: newUser, firebaseToken, jwtToken });


    } catch (error) {
        res.status(500).json({ message: "Signup Error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }
    try {
        const userCredential = await admin.auth().getUserByEmail(email);

        if (!userCredential) {
            return res.status(401).json({ message: "User not found" });
        }

        const existingUser = await user.findOne({ where: { email } });

        if (!existingUser) {
            return res.status(401).json({ message: "User not found in DB" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const firebaseToken = await admin.auth().createCustomToken(userCredential.uid);

        const jwtToken = jwt.sign({ id: existingUser.id, role: existingUser.role, email }, process.env.JWT_SECRET, { expiresIn: "3h" });

        return res.status(200).json({ message: "Login Successful", user: existingUser, firebaseToken, jwtToken });






    } catch (err) {
        res.status(500).json({ message: "Login Error", error: err.message });
    }
});

module.exports = router;
