const express = require("express");
const api = require("./api");
const app = express();
const port = 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    return api.utils
      .getUserByToken(token)
      .then(user => {
        req.user = user;
        return next();
      })
      .catch(err => {
        return res.send(err);
      });
  }
  next();
});

app.post("/:method", (req, res) => {
  const { method } = req.params;
  const { ctx, body } = req;
  api.methods[method](ctx, body)
    .then(response => res.send(response))
    .catch(error => res.send(error));
});

app.listen(port, () => console.log());
