const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  text: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["public", "semiPublic", "private"]
  }
});

module.exports = schema;
