const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
{
	first_name: {
		type: String,
		required: true,
		trim: true,
	},
	last_name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		trim: true,
	},
	google_id: {
		type: String,
		trim: true,
	},
	facebook_id: {
		type: String,
		trim: true,
	},
	login_type: {
		type: String,
		trim: true,
	}
},
{ timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;