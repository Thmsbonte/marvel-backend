const express = require("express");
const app = express();
const formidable = require("express-formidable");
app.use(formidable());
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const mongoose = require("mongoose");

// CONNECTION TO DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// ROUTES IMPORT
const userRoutes = require("./routes/user");
app.use(userRoutes);
const comicRoutes = require("./routes/comic");
app.use(comicRoutes);
const characterRoutes = require("./routes/character");
app.use(characterRoutes);

app.all("*", (req, res) => {
  console.log("route unknown");
  res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
