const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
