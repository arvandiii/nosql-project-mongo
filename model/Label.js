const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  name: { type: String, required: true }
});

schema.index({ name: 1 });

module.exports = schema;
