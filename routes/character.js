const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET ALL CHARACTERS
router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_SECRET}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "An error occured with the Marvel database, please try again",
    });
  }
});

module.exports = router;
