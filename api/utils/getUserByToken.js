const mongo = require("../../utils/mongo");

const UserToken = mongo.model("UserToken");
const User = mongo.model("User");

const getUserByToken = async token => {
  const userToken = await UserToken.findOne({ token });
  if (!userToken) {
    throw new Error("invalid token");
  }
  const user = await User.findOne({ _id: userToken.userId });
  return user;
};

module.exports = getUserByToken;
