const mongo = require("../../utils/mongo");

const Label = mongo.model("Label");

const mergeLabel = async ({ name }) => {
  let label = await Label.findOne({ name });
  if (!label) {
    label = await Label.create({ name });
  }
  return { label };
};

module.exports = mergeLabel;
