const mongo = require("../../utils/mongo");
const Promise = require("bluebird");

const QuestionMention = mongo.model("QuestionMention");
const Question = mongo.model("Question");


const getMentionsNotification = async user => {
  const questionMentions = await QuestionMention.find({ userId: user._id });
  const questions = await Promise.map(
    questionMentions,
    async questionMention => {
      return Question.find({ _id: questionMention.questionId });
    }
  );
  return questions;
};

module.exports = getMentionsNotification;
