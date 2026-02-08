// import jwt from "jsonwebtoken";

// export function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization || req.cookies.token;
//   const token = authHeader?.startsWith("Bearer ") 
//     ? authHeader.split(" ")[1] 
//     : authHeader;

//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // attach user info to request
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }

// backend/middleware/authmiddleware.js
// backend/middleware/authmiddleware.js
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided. Please login." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // you can access req.user in controllers
    next();
  } catch (err) {
    console.error("verifyToken error:", err);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
}

