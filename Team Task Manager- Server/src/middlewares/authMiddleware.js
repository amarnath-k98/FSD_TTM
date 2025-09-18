import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authString = req.headers.authorization;
  if (!authString || !authString.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
  const token = authString.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
