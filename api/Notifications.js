const validateParams = require("../utils/validateParams");
const getMentionsNotification = require("./utils/getMentionsNotification");
const getAnswersNotification = require("./utils/getAnswersNotification");
const getCommentsNotification = require("./utils/getCommentsNotification");
const requireAuth = require("../utils/requireAuth");

const notifications = async (ctx, params) => {
  return {
    mentions: await getMentionsNotification(ctx.user),
    answers: await getAnswersNotification(ctx.user),
    comments: await getCommentsNotification(ctx.user)
  };
};

module.exports = requireAuth(validateParams(notifications, {}));
