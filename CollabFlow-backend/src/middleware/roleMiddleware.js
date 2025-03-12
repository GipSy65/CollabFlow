const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role) {
            return res.status(403).json({ message: "Unauthorized - No Token Provided" });
        }
        const userRole = req.user.role;

        if(!requiredRoles.includes(userRole)) {
            return res.status(403).json({ message: "Unauthorized - Insufficient Role" });
        }
        next();
    }

};
module.exports = roleMiddleware;