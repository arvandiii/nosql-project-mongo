const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const voteSchema = new Schema({
  questionId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  value: { type: String, required: true, enum: ["up", "down"] }
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
