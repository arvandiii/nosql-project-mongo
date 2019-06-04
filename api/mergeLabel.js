const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");

const Label = mongo.model("Label");

const mergeLabel = async (ctx, params) => {
  const { name } = params;
  let label = await Label.findOne({ name });
  if (!label) {
    label = await Label.create({ name });
  }
  return { label };
};

module.exports = validateParams(mergeLabel, {
  name: "string"
});
