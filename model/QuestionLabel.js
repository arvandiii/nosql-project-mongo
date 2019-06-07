const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  questionId: { type: ObjectId, required: true },
  labelId: { type: ObjectId, required: true }
});

module.exports = schema;
