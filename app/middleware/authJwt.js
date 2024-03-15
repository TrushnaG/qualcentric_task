const jwt = require("jsonwebtoken");
const options = require("../config/options")
const message = require("./message");
const commonConfig = require("../config/common.config")
const {methods: commonServices} = require("../services/common")

const User = require('../models/users.model')

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      success: options.API_STATUS.FAILED,
      message: message.Auth.TOKEN_EXPIRED
    });
  }
  return res.status(401).json({
    success:options.API_STATUS.FAILED,
    message: message.Auth.BAD_REQUEST
  });
}

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      success: options.API_STATUS.FAILED,
      message: message.Auth.NO_TOKEN
    });
  }
  jwt.verify(token, commonConfig.jwtkey, (err, decoded) => {
    if (err) { return catchError(err, res); }
    
    req.userId = decoded.user_id;
    next();
  });
};


