const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userLabelSchema = new Schema({
  type: { type: String, enum: ["interest", "skill"] },
  userId: { type: ObjectId, required: true },
  labelId: { type: ObjectId, required: true }
});

const UserLabel = mongoose.model("UserLabel", userLabelSchema);

module.exports = UserLabel;
