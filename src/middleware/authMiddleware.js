
const admin = require("../config/firebase")

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No Token Provided"});
    }try{
        const decodedToken = await admin.auth().verifyIdToken(token);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            return res.status(401).json({ message: "Token Expired"});
        }
        req.user = decodedToken;
        next();
    }catch(err){
        console.error("Token Verification error",err.message);
        return res.status(403).json({ message: "Invalid or Expired Token"});
    }
};

module.exports = verifyFirebaseToken;