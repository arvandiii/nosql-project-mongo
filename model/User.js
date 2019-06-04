const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
