const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  userId: { type: ObjectId, required: true },
  text: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["public", "semiPublic", "private"]
  }
});

module.exports = schema;
