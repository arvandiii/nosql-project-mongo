const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  type: { type: String, enum: ["comment", "asnwer"] },
  questionId: { type: ObjectId, required: true },
  replyTo: { type: ObjectId, required: true },
  mentionUserId: { type: ObjectId, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  userId: { type: ObjectId, required: true }
});

schema.index({ questionId: 1 });

module.exports = schema;
