const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Bearer scheme

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Store decoded user info in req.user
        next(); // Move to the next middleware or route
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token." });
    }
};

module.exports = authMiddleware;
