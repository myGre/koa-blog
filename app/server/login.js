const AdminDao = require('@dao/admin')
const UserDao = require("@dao/user")
const { Auth } = require("@middlewares/auth")
const { generateToken } = require("@core/utils")
class LoginManager {

	// 管理员登录
	static async adminLogin(data) {
		const [err, userInfo] = await AdminDao.valider(data)
		if (!err) {
			return [null, generateToken(userInfo._id, Auth.ADMIN)]
		} else {
			return [err, null]
		}
	}
	// 普通用户登录
	static async userLogin(data) {
		const [err, userInfo] = await UserDao.valider(data)
		if (!err) {
			return [null, generateToken(userInfo._id, Auth.USER)]
		} else {
			return [err, null]
		}
	}

}

module.exports = {
	LoginManager
}