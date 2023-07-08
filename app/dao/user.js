const User = require("@models/User")
const bcrypt = require("bcryptjs")

class UserDao {
	// 创建普通用户
	static async create(data) {
		let { nickName, email, password } = data
		try {
			// 是否存在
			const isExistence = await User.findOne({ email })
			if (isExistence) {
				throw new global.errs.Existing("该邮箱已注册！")
			}
			await User.create({
				nickName,
				email,
				password
			})
			let data = { nickName, email }
			return [null, data]
		} catch (err) {
			return [err, null];
		}
	}
	// 验证邮箱/密码
	static async valider(data) {
		const { email, password } = data
		try {
			const userInfo = await User.findOne({ email })
			if (!userInfo) throw new global.errs.AuthFailed("密码或邮箱错误！")
			// 校验密码
			let isV = bcrypt.compareSync(password, userInfo.password)
			if (!isV) throw new global.errs.AuthFailed("密码或邮箱错误！")
			return [null, userInfo]
		} catch (err) {
			console.log(err, 'err');
			return [err, null]
		}
	}
	// 查询当前用户信息
	static async detail(_id) {
		try {
			const user = await User.findById({ _id })
			if (!user) throw new global.errs.ParameterException("找不到该用户！")
			return [null, user]
		} catch (err) {
			console.log(err, 'err');
			return [err, null]
		}
	}

	// 删除某个用户
	static async delete(_id) {
		try {
			const user = await User.findById({ _id })
			if (!user) throw new global.errs.ParameterException("找不到该用户！")
			const data = await User.findByIdAndRemove({ _id })

			return [null, user]
		} catch (err) {
			console.log(err, 'err');
			return [err, null]
		}
	}
	// 获取用户列表
	static async list(params) {
		const { pageNo = 1, pageSize = 10 } = params
		const searchs = {}
		try {
			let data = {}
			data.rows = await User.find(searchs).skip(pageSize * (pageNo - 1)).limit(pageSize).sort("-createdAt")
			data.total = await User.countDocuments(searchs)
			data.pageNo = +pageNo
			data.pageSize = +pageSize

			return [null, data]
		} catch (err) {
			console.log(err, 'err');
			return [err, null]
		}
	}
}

module.exports = UserDao