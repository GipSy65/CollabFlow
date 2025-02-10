const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");

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

const verifyFirebaseToken = require("../middleware/authMiddleware");

router.get("/profile", verifyFirebaseToken, (req, res) => {
    res.json({ message: "Welcome to CollabFlow!!", user: req.user });
});

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Email and Password are required" });
    }
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        const customToken = await admin.auth().createCustomToken(userRecord.uid);

        return res.status(201).json({ message: "User Created Successfully", user: userRecord , token: customToken });
    } catch (error) {
        res.status(500).json({ message: "Signup Error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ message: "Email and Password are required" });
    }
    try {
       const userCredential = await admin.auth().getUserByEmail(email);

       if(!userCredential){
           return res.status(401).json({ message: "User not found" });
       }

       const customToken = await admin.auth().createCustomToken(userCredential.uid);

       return res.status(200).json({ message: "Login Successful", token: customToken });
    } catch (err) {
        res.status(500).json({ message: "Login Error", error: err.message });
    }
});

module.exports = router;
