const Comment = require("@models/Comment")

class CommentDao {
	// 创建评论
	static async create(data) {

		try {
			await Comment.create(data)

			return [null, "创建评论成功！"]
		} catch (err) {
			return [err, null]
		}
	}

	// 删除评论
	static async delete(_id) {
		try {
			const data = await Comment.findById({ _id })
			if (!data) throw new global.errs.ParameterException("找不到该评论！")
			await Comment.findByIdAndRemove({ _id })

			return [null, "删除成功！"]
		} catch (err) {
			return [err, null]
		}
	}
}

module.exports = CommentDao