const { pool } = require("../config/sqlClient");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM product");
    console.log("Products:", products.rows);
    if (products.rows.length > 0) {
      return res.status(200).json({
        result: products.rows,
        message: "data fetched",
      });
    } else {
      return res.status(404).json({
        message: "no product found",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: "Failed to fetch products" });
  }
};

exports.insertProduct = async (req, res) => {
  try {
    console.log({ body: req.body });
    const { name, description, price, stock } = req.body;
    const insert = await pool.query(
      `INSERT INTO product (name,description,price,stock) VALUES ($1, $2, $3, $4)`,
      [name, description, price, stock]
    );
    res
      .status(201)
      .json({ res: insert.row[0], message: "data added successfully" });
  } catch (err) {
    console.log("error inert", err);
    res.status(500).json({ error: err, message: "error insert" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const update = await pool.query(
      "UPDATE product SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *;",
      [name, description, price, stock, id]
    );
    if (update.rows.length === 0) {
      return res.status(404).json({
        message: "product not found",
        result: update.rows[0],
      });
    }
  } catch (err) {
    res.status(500).json({ err: "error server" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await pool.query(
      "DELETE FROM product WHERE id=$1 RETURNING *;",
      [id]
    );
    if (del.rows.length === 0) {
      res.status(404).json("data not found");
    }
    res.status(200).json({
      message: "Data Deleted",
    });
  } catch (err) {
    res.status(500).json("internal server errror");
  }
};
