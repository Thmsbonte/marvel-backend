const express = require("express");
const app = express();
const formidable = require("express-formidable");
app.use(formidable());
const cors = require("cors");
app.use(cors());
require("dotenv").config();

// ROUTES IMPORT
const comicRoutes = require("./routes/comic");
app.use(comicRoutes);
const characterRoutes = require("./routes/character");
app.use(characterRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen("3001", () => {
  console.log("Server has started");
});
