const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
var nodemailer = require("nodemailer");
const Promise = require("bluebird");
const hash = require("../utils/hash");

const User = mongo.model("User");

const pass = "*";
const from = "alireza.arv.mail@gmail.com";

const sendMail = ({ user, newPassword }) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: from,
        pass
      }
    });
    transporter.sendMail(
      {
        from,
        to: user.email,
        subject: "Reset your password",
        text: `your new password is: ${newPassword}\nlogin and change your password`
      },
      (err, info) => {
        console.log(err, info);
        err ? reject(err) : resolve(info);
      }
    );
  });
};

const resetPassword = async (ctx, params) => {
  const { username } = params;
  const user = await User.findOne({ username });

  const newPassword = `${Math.floor(Math.random() * 90000) + 10000}`;
  const passwordHash = hash(newPassword);
  console.log({ _id: user._id }, { $set: { passwordHash } });
  await User.findOneAndUpdate({ _id: user._id }, { $set: { passwordHash } });
  const info = await sendMail({
    user,
    newPassword
  });
  console.log("hereeeee", info);
  return {};
};

module.exports = validateParams(resetPassword, {
  username: "string"
});
