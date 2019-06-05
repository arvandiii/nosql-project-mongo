const mongo = require("../../utils/mongo");
const QuestionMention = mongo.model("QuestionMention");

const getQuestionsUserMentioned = async user => {
  const questionMentions = await QuestionMention.find({ userId });
  const questions = await Promise.map(
    questionMentions,
    async questionMention => {
      return Question.find({ _id: questionMention.questionId });
    }
  );
  return questions;
};

module.exports = getQuestionsUserMentioned;
