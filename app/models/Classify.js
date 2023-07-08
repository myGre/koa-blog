const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schema = new Schema({
	// 分类名称
	name: {
		type: String,
	},
	// 状态：1启用/0停用
	status: {
		type: Number,
		enum: [0, 1],
		default: 1,
	},
	// 排序
	sort_order: {
		type: Number,
		default: 1
	},
	createdAt: Number,
	updatedAt: Number
}, {
	timestamps: {
		currentTime: () => Math.floor(Date.now() / 1000)
	}
})
module.exports = mongoose.model('classify', schema)

