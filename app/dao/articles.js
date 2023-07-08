const Articles = require("@models/Articles")
const Classify = require("@models/classify")
const { isArray } = require("@lib/utils")

class ArticlesDao {
	// 创建文章
	static async add(data) {
		const { title, description, author_id, content, browse, classify_id } = data
		try {
			// 是否存在
			const isExistence = await Articles.findOne({ title })
			if (isExistence) {
				throw new global.errs.Existing("该文章已存在！")
			}
			await Articles.create({ title, description, author_id, content, browse, classify_id })

			return [null, data]
		} catch (err) {
			return [err, null]
		}
	}
	// 查询相应的分类
	static async handlerClassify(data, ids) {
		const finner = {}
		if (isArray(ids)) {
			finner._id = { $in: ids }
		} else {
			finner._id = ids
		}
		try {
			const res = await Classify.find(finner)
			const classify = {}
			res.forEach(item => {
				classify[item._id] = item
			})

			data = data.map(item => {
				const obj = { "classify": classify[item.classify_id] || {} }
				item = { ...item, ...obj }
				return item
			})
			// console.log(data, 'data')
			return [null, data]
		} catch (err) {
			console.log(err, 'classifyErr')
			return [err, null]
		}
	}
	// 获取文章列表
	static async list(params) {
		params = params ? params : {}
		const searchs = {}
		const { pageNo = 1, pageSize = 10 } = params
		try {
			const data = {}
			const rows = await Articles.find(searchs).skip(pageSize * (pageNo - 1)).limit(pageSize).sort("-createdAt")
			data.rows = JSON.parse(JSON.stringify(rows)) // 拷贝一份
			data.total = await Articles.countDocuments(searchs)
			data.pageNo = pageNo
			data.pageSize = pageSize
			// 处理分类
			const ids = data.rows.map(item => item.classify_id)

			const [err, dataAndClassify] = await ArticlesDao.handlerClassify(data.rows, ids)
			data.rows = dataAndClassify
			return [null, data]
		} catch (err) {
			return [err, null]
		}
	}
	// 查看文章详情
	static async detail(_id) {
		try {
			const data = {}
			const rows = await Articles.findById({ _id })
			if (!rows) {
				throw new global.errs.Existing("文章已被删除！")
			}
			data.rows = [JSON.parse(JSON.stringify(rows))]
			const [err, dataAndClassify] = await ArticlesDao.handlerClassify(data.rows, data.rows[0].classify_id)

			data.rows = dataAndClassify
			return [null, data.rows[0]]
		} catch (err) {
			return [err, null]
		}
	}
	// 删除指定文章
	static async delete(_id) {
		try {
			const rows = await Articles.findById({ _id })
			if (!rows) {
				throw new global.errs.Existing("文章已被删除！")
			}
			await Articles.findByIdAndRemove({ _id })

			return [null, rows]
		} catch (err) {
			return [err, null]
		}
	}
}

module.exports = ArticlesDao