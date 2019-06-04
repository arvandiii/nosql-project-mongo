const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userTokenSchema = new Schema({
  userId: { type: ObjectId, required: true, unique: true },
  token: { type: String, required: true, unique: true }
});

userTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 * 60 });

const UserToken = mongoose.model("UserToken", userTokenSchema);

module.exports = UserToken;
