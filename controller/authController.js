const bcrypt = require("bcrypt");
const { pool } = require("../config/sqlClient");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExist = await pool.query(
      "SELECT * FROM users WHERE username = $1;",
      [username]
    );
    if (userExist.rows.length > 0) {
      return res.status(400).json({
        message: "user allready exist",
      });
    }

    const hash = await bcrypt.hash(password, 3);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hash,
    ]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1;", [
      username,
    ]);
    console.log("user", username);
    console.log("pass", password);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid creentials" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentia" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, username: user.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, message: "token" });
    console.log({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
      message: "internal server error",
    });
  }
};
