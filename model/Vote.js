const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  questionId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  value: { type: Number, required: true, enum: ["up", "down"] }
});

module.exports = schema;
