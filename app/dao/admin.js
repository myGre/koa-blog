const Admin = require("@models/Admin")
const bcrypt = require("bcryptjs")

class AdminDao {
	// 创建管理员
	static async create(data) {
		let { nickName, email, password } = data
		try {
			// 是否存在
			let isExistence = await Admin.findOne({ email })
			if (isExistence) {
				throw new global.errs.Existing("该邮箱已注册！")
			}
			await Admin.create({
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
			let userInfo = await Admin.findOne({ email })

			if (!userInfo) throw new global.errs.AuthFailed("密码或邮箱错误！")
			// 校验密码
			let isV = bcrypt.compareSync(password, userInfo.password)
			if (!isV) throw new global.errs.AuthFailed("密码或邮箱错误！")
			return [null, userInfo]
		} catch (err) {
			return [err, null]
		}
	}
	// 查询当前管理员信息
	static async detail(_id) {
		try {
			let user = await Admin.findById({ _id })
			if (!user) throw new global.errs.AuthFailed()
			return [null, user]
		} catch (err) {
			return [err, null]
		}
	}
}

module.exports = AdminDao