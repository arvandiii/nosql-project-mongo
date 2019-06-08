const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  questionId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  value: { type: Number, required: true, enum: ["up", "down"] }
});

schema.index({ questionId: 1 });

module.exports = schema;
