const express = require("express");
const app = express();
const formidable = require("express-formidable");
app.use(formidable());
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const mongoose = require("mongoose");

// CONNECTION TO DB
mongoose.connect("mongodb://localhost:27017/marvel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ROUTES IMPORT
const comicRoutes = require("./routes/comic");
app.use(comicRoutes);
const characterRoutes = require("./routes/character");
app.use(characterRoutes);

app.all("*", (req, res) => {
  console.log("route unknown");
  res.status(404).json({ message: "Route not found" });
});

app.listen("3001", () => {
  console.log("Server has started");
});
