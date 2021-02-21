const mongoose = require("mongoose");

// USER MODEL
const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
