const express = require("express");
const router = express.Router();

const verifyFirebaseToken = require("../middleware/authMiddleware");

router.get("/profile", verifyFirebaseToken, (req, res) => {
    res.json({ message: "Welcome to CollabFlow!!", user: req.user });
});

module.exports = router;