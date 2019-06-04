const mongo = require("mongoose");
const fs = require("fs");
const path = require("path");

const database = "reddit";

mongo.set("useCreateIndex", true);

mongo.connect(`mongodb://mongo:27017/${database}`, {
  poolSize: 10,
  useNewUrlParser: true
});

const models = fs.readdirSync(path.join(__dirname, "..", "model"));

models.forEach(m => {
  const [modelName] = m.split(".");
  const schemaPath = path.join(__dirname, "..", "model", modelName);
  const schema = require(schemaPath);
  mongo.model(modelName, schema);
});

module.exports = mongo;
