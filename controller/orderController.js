const { pool } = require("../config/sqlClient");

exports.getOrder = async (req, res) => {
  try {
    const order = await pool.query(
      "SELECT orders.id AS order_id,users.username AS user_name, product.name, orders.qty, orders.total_price, orders.order_date,orders.status FROM orders JOIN users ON orders.user_id = users.id JOIN product ON orders.product_id = product.id;"
    );
    if (order.rows.length > 0) {
      return res.status(200).json({
        message: "Order Data Fetched",
        result: order.rows,
      });
    } else {
      return res.status(400).json({
        message: "No data Found",
      });
    }
  } catch (err) {
    console.log("err");
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.insertOrder = async (req, res) => {
  const { product_id, qty, total_price } = req.body;
  const user_id = req.user.id;

  try {
    const order = await pool.query(
      "INSERT INTO orders (user_id, product_id, qty, total_price) VALUES ($1, $2, $3, $4) RETURNING *;",
      [user_id, product_id, qty, total_price]
    );

    return res.status(201).json({
      message: "Data successfully inserted",
      result: order.rows[0],
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const del = await pool.query(
      "DELETE FROM orders WHERE id=$1 RETURNING *;",
      [id]
    );
    if (del.rows.length === 0) {
      res.status(404).json({
        message: "data not found",
      });
    }
    res.status(20).json({
      message: "Data Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      error: err,
    });
  }
};

exports.udpateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const update = await pool.query(
      "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );
    if (update.rows.length === 0) {
      res.status(404).json({
        message: "order not found",
      });
    }
    return res.status(200).json({
      message: "Status updated successfully",
      order: update.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "error update",
      error: err,
    });
  }
};
