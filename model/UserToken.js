const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  userId: { type: ObjectId, required: true, unique: true },
  token: { type: String, required: true, unique: true }
});

schema.index({ createdAt: 1 }, { expireAfterSeconds: 5 * 60 });

module.exports = schema;
