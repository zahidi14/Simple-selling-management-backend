const express = require("express");

const auth = require("./routes/authRoutes");
const router = require("./routes/route");
const app = express();
const PORT = 5000;
app.use(express.json());
app.use("/auth", auth);
app.use("/", router);

// app.use("/api", route)
app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
