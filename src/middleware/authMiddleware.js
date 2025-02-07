
const admin = require("../config/firebase")

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No Token Provided"});
    }try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }catch(err){
        return res.status(403).json({ message: "Invalid or Expired Token"});
    }
};

module.exports = verifyFirebaseToken;