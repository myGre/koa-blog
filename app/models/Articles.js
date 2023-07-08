const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schema = new Schema({
	// 文章名称
	title: {
		type: String,
	},
	// 简介
	description: {
		type: String
	},
	// 作者Id
	author_id: {
		type: String
	},
	// 内容
	content: {
		type: String
	},
	// 排序
	sort_order: {
		type: Number,
		default: 1
	},
	// 文章浏览次数
	browse: {
		type: Number,
		default: 0
	},
	// 文章点赞次数
	likeNum: {
		type: Number,
		default: 0
	},
	// 所属分类Id
	classify_id: {
		type: String
	},
	createdAt: Number,
	updatedAt: Number
}, {
	timestamps: {
		currentTime: () => Math.floor(Date.now() / 1000)
	}
})
// 计算属性
// schema.virtual("classify")
// 	.set(function (value) {
// 		return value[this.classify_id]
// 	})

module.exports = mongoose.model('articles', schema)

