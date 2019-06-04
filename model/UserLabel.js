const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  type: { type: String, enum: ["interest", "skill"] },
  userId: { type: ObjectId, required: true },
  labelId: { type: ObjectId, required: true }
});

module.exports = schema;
