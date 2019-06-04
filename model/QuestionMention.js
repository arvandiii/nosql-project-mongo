const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionMentionSchema = new Schema({
  questionId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true }
});

const QuestionMention = mongoose.model(
  "QuestionMention",
  questionMentionSchema
);

module.exports = QuestionMention;
