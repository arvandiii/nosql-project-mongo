const mongo = require("../../utils/mongo");
const Promise = require("bluebird");

const Comment = mongo.model("Comment");

const getCommentsRecursive = async ({ objId }) => {
  const comments = await Comment.find({ replyTo: objId });
  return Promise.map(comments, async comment => {
    return {
      comment,
      comments: getCommentsRecursive({ objId: comment._id })
    };
  });
};

module.exports = getCommentsRecursive;
