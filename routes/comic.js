const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET ALL COMIC
router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_SECRET}`
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

// GET COMICS LINK TO A SPECIFIC CHARACTER
router.get("/comics/:characterId", async (req, res) => {
  const { characterId } = req.params;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_SECRET}`
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
