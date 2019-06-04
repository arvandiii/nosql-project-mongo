const express = require("express");
const path = require("path");
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
    return api
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

const api = {};
const getMethod = method => {
  if (api[method]) {
    return api[method];
  }
  api[method] = require(path.join(__dirname, "api", method));
  if (!method) {
    return async () => {
      return new Error("method invalid");
    };
  }
  return api[method];
};

app.post("/api/:method", (req, res) => {
  const { method } = req.params;
  const { ctx, body } = req;
  getMethod(method)(ctx, body)
    .then(response => res.send({ res: response }))
    .catch(error => res.send({ err: error.message }));
});

app.listen(port, () => console.log("server running at ", port));
