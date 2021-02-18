const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET ALL CHARACTERS
router.get("/characters", async (req, res) => {
  const { name, limit, skip } = req.query;
  let url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_SECRET}`;
  if (name) {
    url = `${url}&name=${name}`;
  }
  if (limit) {
    url = `${url}&limit=${limit}`;
  }
  if (skip) {
    url = `${url}&skip=${skip}`;
  }
  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "An error occured with the Marvel database, please try again",
    });
  }
});

module.exports = router;
