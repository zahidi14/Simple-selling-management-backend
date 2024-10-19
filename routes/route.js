const express = require("express");
const router = express.Router();
const productController = require("../controller/prodController");
const authToken = require("../middleware/auth");
const { pool } = require("../config/sqlClient");
const {
  getOrder,
  insertOrder,
  deleteOrder,
  udpateStatus,
} = require("../controller/orderController");

const checkUserExists = async (req, res, next) => {
  const username = req.params.username;
  try {
    const userExists = await pool.query(
      "SELECT 1 FROM users WHERE username = $1",
      [username]
    );
    if (userExists.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error("Error checking user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

router.use("/:username", authToken, checkUserExists);

router.get("/:username/products", productController.getAllProducts);
router.post("/:username/products", productController.insertProduct);
router.put("/:username/products/:id", productController.updateProduct);
router.delete("/:username/products/:id", productController.deleteProduct);

router.get("/:username/orders", getOrder);
router.post("/:username/orders", insertOrder);
router.delete("/:username/orders/:id", deleteOrder);
router.patch("/:username/orders/:id", udpateStatus);

module.exports = router;
