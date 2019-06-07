const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  questionId: { type: ObjectId, required: true },
  text: { type: String, required: true },
  mentionUserId: { type: ObjectId, required: true },
  createdAt: { type: Date, default: new Date() },
  userId: { type: ObjectId, required: true }
});

module.exports = schema;
