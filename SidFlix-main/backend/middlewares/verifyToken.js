import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, "YOUR_JWT_SECRET"); // same as login secret
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Token is not valid" });
  }
};

export default verifyToken;
