const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["public", "semiPublic", "private"]
  }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
