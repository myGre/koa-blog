const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

let Schema = mongoose.Schema
const schema = new Schema({
	nickName: {
		type: String,
	},
	email: {
		type: String
	},
	password: {
		type: String,
		set(val) {
			return bcrypt.hashSync(val, 10)
		}
	},
	url: {
		type: String
	},
	avatarImg: {
		type: String
	},
	createdAt: Number,
	updatedAt: Number

}, {
	timestamps: {
		currentTime: () => Math.floor(Date.now() / 1000)
	}
})
module.exports = mongoose.model('User', schema)