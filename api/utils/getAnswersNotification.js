const mongo = require("../../utils/mongo");

const Answer = mongo.model("Answer");

const getanswersNotification = async user => {
  const answers = await Answer.find({ mentionUserId: user._id });
  return answers;
};

module.exports = getanswersNotification;
