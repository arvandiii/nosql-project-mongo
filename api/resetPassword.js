const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
var nodemailer = require("nodemailer");
const Promise = require("bluebird");
const hash = require("../utils/hash");

const User = mongo.model("User");

const pass = "ALIREZA2394arv";
const from = "alireza.arv.mail@gmail.com";

const resetPassword = async (ctx, params) => {
  const { username } = params;
  const user = await User.findOne({ username });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from,
      pass
    }
  });

  const newPassword = Math.floor(Math.random() * 90000) + 10000;
  await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { passwordHash: hash(newPassword) } }
  );

  const sendMail = Promise.promisify(transporter.sendMail);
  const info = await sendMail({
    from,
    to: user.email,
    subject: "Reset your password",
    text: `your new password is: ${newPassword}\nlogin and change your password`
  });
  console.log("hereeeee", info);
  return {};
};

module.exports = validateParams(resetPassword, {
  username: "string"
});
