
const admin = require("../config/firebase")
const jwt = require("jsonwebtoken");

const verifyAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    } try {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        }
        catch (jwtError) {
            console.error("JWT Verification error", err.message);
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error("Token Verification error", err.message);
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = verifyAuth;