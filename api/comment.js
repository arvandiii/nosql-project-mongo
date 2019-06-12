const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const requireAuth = require("../utils/requireAuth");

const Comment = mongo.model("Comment");
const Answer = mongo.model("Answer");

const comment = async (ctx, params) => {
  const {
    user: { _id: userId }
  } = ctx;
  const { text, replyTo, type } = params;
  let obj = null;
  if (type === "comment") {
    obj = await Comment.findOne({ _id: replyTo });
  } else {
    obj = await Answer.findOne({ _id: replyTo });
  }
  const commentObj = await Comment.create({
    text,
    questionId: obj.questionId,
    userId,
    replyTo,
    mentionUserId: obj.userId
  });
  return { comment: commentObj };
};

module.exports = requireAuth(
  validateParams(comment, {
    text: "string",
    type: "string",
    replyTo: "string"
  })
);
