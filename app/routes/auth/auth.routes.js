const authController = require("../../controller/auth/auth.controller.js");
const {userSignUpValidation, userLoginValidation, userSocialLoginValidation} = require('../../controller/auth/common.services.js');
const {authJwt, verifySignup} = require("../../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

app.post("/api/user/registration", [userSignUpValidation, verifySignup.checkDuplicateEmail], authController.userRegistration);
app.post("/api/user/login",[userLoginValidation], authController.userLogin);
app.get("/api/user/me",[authJwt.verifyUserToken], authController.viewMyProfile);
app.post("/api/user/sociallogin",[userSocialLoginValidation], authController.socialLogin);

};