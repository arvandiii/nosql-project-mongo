const mongo = require("../../utils/mongo");
const Comment = mongo.model("Comment");

const getCommentsNotification = async user => {
  const comments = await Comment.find({ mentionUserId: user._id });
  return comments;
};

module.exports = getCommentsNotification;
