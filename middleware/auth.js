const jwt = require("jsonwebtoken");

require("dotenv").config();

const authToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    // res.json({ message: "authorized" });
    next();
  } catch (err) {
    res.status(400).json({ error: err, message: "invalid token" });
  }
};

module.exports = authToken;
