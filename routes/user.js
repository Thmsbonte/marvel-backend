const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// DB MODELS IMPORT
const User = require("../models/User");

// SIGN UP ROUTE
router.post("/user/signup", async (req, res) => {
  try {
    // Est-ce que l'email et le mdp sont renseignés
    if (req.fields.email && req.fields.password) {
      // Est-ce que l'email existe déjà dans la BDD
      if (req.fields.password.length >= 6) {
        const mail = await User.findOne({ email: req.fields.email });
        if (!mail) {
          // Hash generation
          const salt = uid2(16);
          const hash = SHA256(req.fields.password + salt).toString(encBase64);
          const token = uid2(16);
          // Creation de l'utilisateur dans la BDD
          const user = new User({
            email: req.fields.email,
            token: token,
            hash: hash,
            salt: salt,
          });
          await user.save();
          // Réponse au client
          res.status(200).json({
            _id: user._id,
            token: user.token,
            email: user.email,
          });
        } else {
          res.status(400).json({ message: "L'utilisateur existe déjà" });
        }
      } else {
        res
          .status(400)
          .json({
            message: "Votre mot de passe doit contenir au minimum 6 caractères",
          });
      }
    } else {
      res.status(400).json({ message: "Veuillez compléter tous les champs" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN ROUTE
router.post("/user/login", async (req, res) => {
  try {
    // Si mail et password sont présents, vérification que l'utilisateur existe
    if (req.fields.email && req.fields.password) {
      const user = await User.findOne({ email: req.fields.email });
      if (user) {
        // Si oui, génération de son hash
        const hash = SHA256(req.fields.password + user.salt).toString(
          encBase64
        );
        // Vérification avec les information issues de la BDD. Si OK, réponse à l'utilisateur
        if (hash === user.hash) {
          res.status(200).json({
            _id: user._id,
            token: user.token,
            email: user.email,
          });
        } else {
          res.status(401).json({ message: "Non autorisé" });
        }
      } else {
        res.status(401).json({ message: "Non autorisé" });
      }
    } else {
      res.status(400).json({ message: "Veuillez compléter tous les champs" });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        message:
          "La connexion à la base de données a échoué, veuillez réessayer",
      });
  }
});

module.exports = router;
