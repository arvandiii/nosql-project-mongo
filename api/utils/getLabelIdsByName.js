const getLabelByName = require("./getLabelByName");
const Promise = require("bluebird");

const getLabelIds = async names => {
  return Promise.map(names, async name => {
    const label = await getLabelByName(name);
    return label._id
  });
};

module.exports = getLabelIds;
