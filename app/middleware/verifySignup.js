const options = require("../config/options")
const message = require("./message");
const commonConfig = require("../config/common.config")
const {methods: commonServices} = require("../services/common")

const User = require('../models/users.model')

exports.checkDuplicateEmail =async (req, res, next) => {
    try {
    return commonServices.get(User, {email:req.body.email })
    .then((user) => {
       if(user){
        return res.status(400).json({success:options.API_STATUS.FAILED, message:message.Auth.DATA_EXIST("Email")})
       }
       next()
    }); 
    } catch (error) {
        return res.status(500).json({success:options.API_STATUS.FAILED, message:error.message})
    }
  };