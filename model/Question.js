const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  userId: { type: ObjectId, required: true },
  text: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["public", "semiPublic", "private"]
  }
});

schema.index({ userId: 1 });

module.exports = schema;
