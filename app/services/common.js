const jwt = require("jsonwebtoken");
const commonConfig = require("../config/common.config");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")
const methods = {
	create: async (Model, data) => {
		return Model.create(data)
	},
	get: async (Model, query, additional = undefined) => {
		return Model.findOne(query, additional || undefined)
	},
	checkFlag: async (Model, query) => {
		return Model.countDocuments(query)
	},
	getById: async (Model, id) => {
		return Model.findById(id)
	},
	updateOne: async (Model, query, data, ) => {
		return Model.updateOne(query, data);
	},
	generateHashPassword: async (myPassword) => {
		const salt = await bcrypt.genSalt(10);
		const newPassword = await bcrypt.hashSync(myPassword, salt)
		return newPassword
	},
	passwordCompare: async (myPassword, hash, additional = undefined) => {
		return await bcrypt.compareSync(myPassword, hash, additional || undefined)
	},
	generateToken: (user_id) => {
		let token = jwt.sign({ user_id: user_id }, commonConfig.jwtkey, { expiresIn: commonConfig.token_expire });
		return token;
	}

}


module.exports = { methods }