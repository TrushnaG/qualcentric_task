const express = require('express')
const app = express();

module.exports = function (app) {
  require("./auth/auth.routes")(app);
}