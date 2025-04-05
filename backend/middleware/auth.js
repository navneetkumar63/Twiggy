import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token; 
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized",
            });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id; 
        next(); 

    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;
