const { methods: commonServices } = require("../../services/common");
const commonResponse = require("./common.response");
const message = require("../message");
const options = require("../../config/options");

const User = require("../../models/users.model")

//user registration
exports.userRegistration = async (req, res) => {
  try {
        const userData = await commonServices.create(User, {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: await commonServices.generateHashPassword(req.body.password),
          login_type:options.LOGIN_METHOD.EMAIL
        })
        if (!userData) {
          return res.status(403).json({ success:options.API_STATUS.FAILED, message: message.REGISTER_FAILD })
        }
        const token = commonServices.generateToken(userData.id);
        const response = commonResponse.modifyUser(userData)
        return res.status(200).json({ success: options.API_STATUS.SUCCESS, message: message.REGISTER_SUCCESS,data: {...response, accessToken: token} })
  } catch (error) { res.status(500).json({ success: options.API_STATUS.FAILED, message: error.message }) }
};

//user login
exports.userLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const existUser = await commonServices.get(User, {email},'_id first_name last_name email password createdAt')
    if (!existUser) {
      return res.status(404).json({ success:options.API_STATUS.FAILED, message: message.NO_DATA("User") });
    }
      let passwordValidate = await commonServices.passwordCompare(password, existUser.password);
      if (!passwordValidate) {
        return res.status(401).json({success:options.API_STATUS.FAILED,message:message.INVALID("Password")});
      }
      let token = commonServices.generateToken(existUser.id);
      const userRes = { ...existUser.toJSON(), password: undefined }
      return res.status(200).json({success:options.API_STATUS.SUCCESS, message:message.LOGIN_SUCCESS, data:{...userRes,accessToken:token}})

  } catch (error) {
    res.status(500).json({ success: options.API_STATUS.FAILED, message: error.message })
  }
}

//view my profile
exports.viewMyProfile = async (req, res) =>{
try {
  const userId = req.userId
  const userData = await commonServices.get(User, {_id: userId}, '_id first_name last_name email google_id facebook_id createdAt')
  if(!userData){
    return res.status(404).json({success:options.API_STATUS.FAILED, message:message.NO_DATA("User")})
  }
  return res.status(200).json({success:options.API_STATUS.SUCCESS, message:message.GET_DATA("Profile"), data: userData})
} catch (error) {
  res.status(500).json({ success: options.API_STATUS.FAILED, message: error.message })
}
}

//social login
exports.socialLogin = async (req, res) =>{
try {
  const { email, first_name, last_name, google_id, facebook_id, login_type } = req.body;
  const userDetails = await commonServices.get(User, {email})
  if(userDetails){
    if(login_type == options.LOGIN_METHOD.GOOGLE && userDetails.google_id === google_id){
      const updateUser = await commonServices.updateOne(User, {_id: userDetails.id}, {first_name,last_name,google_id})
      const token = commonServices.generateToken(userDetails.id);
      const response = commonResponse.modifyUser(userDetails)
      return res.status(200).json({ success: options.API_STATUS.SUCCESS, message: message.LOGIN_SUCCESS,data: {...response, accessToken: token} })
    } else if(login_type == options.LOGIN_METHOD.FACEBOOK && userDetails.facebook_id === facebook_id){
      const updateUser = await commonServices.updateOne(User, {_id: userDetails.id}, {first_name,last_name,facebook_id})
      const token = commonServices.generateToken(userDetails.id);
      const response = commonResponse.modifyUser(userDetails)
      return res.status(200).json({ success: options.API_STATUS.SUCCESS, message: message.LOGIN_SUCCESS,data: {...response, accessToken: token} })
    } else {
      return res.status(403).json({success:options.API_STATUS.FAILED, message:message.INVALID("Google Id/Facebook Id")})
    }
  } else {
    const userData = await commonServices.create(User, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      google_id: google_id,
      facebook_id: facebook_id,
      login_type: login_type
    })
    if (!userData) {
      return res.status(403).json({ success:options.API_STATUS.FAILED, message: message.LOGIN_FAILED })
    }
    const token = commonServices.generateToken(userData.id);
    const response = commonResponse.modifyUser(userData)
    return res.status(200).json({ success: options.API_STATUS.SUCCESS, message: message.LOGIN_SUCCESS,data: {...response, accessToken: token} })
  }
} catch (error) {
  res.status(500).json({ success: options.API_STATUS.FAILED, message: error.message })
}
}


