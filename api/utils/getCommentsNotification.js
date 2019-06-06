const mongo = require("../../utils/mongo");
const Comments = mongo.model("Comments");

const getCommentsNotification = async user => {
  const comments = await Comments.find({ mentionUserId: user._id });
  return comments;
};

module.exports = getCommentsNotification;
