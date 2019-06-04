const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionLabelSchema = new Schema({
  questionId: { type: ObjectId, required: true },
  labelId: { type: ObjectId, required: true }
});

const QuestionLabel = mongoose.model("QuestionLabel", questionLabelSchema);

module.exports = QuestionLabel;
