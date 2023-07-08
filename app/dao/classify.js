const Classify = require("@models/classify")

class ClassifyDao {

	// 添加分类名
	static async add(data) {
		let { name } = data
		try {
			// 是否存在
			let isExistence = await Classify.findOne({ name })
			if (isExistence) {
				throw new global.errs.Existing("该分类已存在！")
			}
			await Classify.create({
				name,
			})
			let data = { name }
			return [null, data]
		} catch (err) {
			return [err, null];
		}
	}
	// 获取分类列表
	static async list(params) {
		params = params ? params : {}
		const searchs = {}
		const { pageNo = 1, pageSize = 10, name } = params
		try {
			let data = {}
			data.rows = await Classify.find(searchs).skip(pageSize * (pageNo - 1)).limit(pageSize).sort("-createdAt")
			data.total = await Classify.countDocuments(searchs)
			data.pageNo = +pageNo
			data.pageSize = +pageSize

			return [null, data]
		} catch (err) {
			console.log(err, 'err');
			return [err, null]
		}
	}
	// 删除某个分类
	static async delete(_id) {
		try {
			const classify = await Classify.findById({ _id })
			if (!classify) throw new global.errs.ParameterException("找不到该分类！")
			await Classify.findByIdAndRemove({ _id })

			return [null, classify]
		} catch (err) {
			console.log(err, 'err');
			return [err, null]
		}
	}
}

module.exports = ClassifyDao