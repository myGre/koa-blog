const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schema = new Schema({
	// 评论内容
	conent: {
		type: String
	},
	// 评论人ID
	user_id: {
		type: String
	},
	// 关联文章ID
	articles_id: {
		type: String
	},
	createdAt: Number,
	updatedAt: Number
}, {
	timestamps: {
		currentTime: () => Math.floor(Date.now() / 1000)
	}
})

module.exports = mongoose.model("Comment", schema)