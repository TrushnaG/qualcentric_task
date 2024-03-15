const joi = require("joi");
const options = require('../../config/options')

const signUpvalidation = joi.object({
    first_name: joi.string().alphanum().min(3).max(25).trim(true).required(),
    last_name: joi.string().alphanum().min(3).max(30).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).trim(true).required() .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one numeric digit and one special character'
    })
.default([]),
});

const userSignUpValidation = async (req, res, next) => {
	const payload = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password
	};

	const { error } = signUpvalidation.validate(payload);
	if (error) {
	return res.status(406).json({
        success:options.API_STATUS.FAILED,
        message: error.message
    })
	} else {
		next();
	}
};

const loginvalidation = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().trim(true).required()
.default([]),
});

const userLoginValidation = async (req, res, next) => {
	const payload = {
		email: req.body.email,
		password: req.body.password
	};

	const { error } = loginvalidation.validate(payload);
	if (error) {
	return res.status(406).json({
        success:options.API_STATUS.FAILED,
        message: error.message
    })
	} else {
		next();
	}
};

const socialLoginvalidation = joi.object({
    first_name: joi.string().alphanum().min(3).max(25).trim(true).required(),
    last_name: joi.string().alphanum().min(3).max(30).trim(true).required(),
    email: joi.string().email().trim(true).required(),
	login_type: joi.string().trim(true).required()
.default([]),
});

const userSocialLoginValidation = async (req, res, next) => {
	const payload = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		login_type: req.body.login_type
	};

	const { error } = socialLoginvalidation.validate(payload);
	if (error) {
	return res.status(406).json({
        success:options.API_STATUS.FAILED,
        message: error.message
    })
	} else {
		next();
	}
};
module.exports = {userSignUpValidation, userLoginValidation, userSocialLoginValidation};