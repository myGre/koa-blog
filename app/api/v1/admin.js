const router = require('koa-router')()
const Resolve = require('@lib/helper')
const { validatorRegister, validatorLogin } = require('@validators/admin')
const AdminDao = require('@dao/admin')
const { LoginManager } = require("@server/login")
const { Auth } = require("@middlewares/auth")
// 响应数据格式
const res = new Resolve()

const AUTH_ADMIN = Auth.ADMIN; // token签名

router.prefix('/api/v1/admin')
// 管理员注册
router.post('/register', async (ctx) => {
	let body = ctx.request.body
	// 校验参数
	let v = validatorRegister(body)
	if (!v.isValid) {
		ctx.status = 400
		ctx.body = res.fail(v.errors)
	} else {
		// 查询数据库
		const [err, data] = await AdminDao.create(body)
		if (err) {
			ctx.status = 400
			ctx.body = res.fail(err.msg)
		} else {
			ctx.body = res.success('注册成功')
		}
	}
})
// 管理员登录
router.post('/login', async (ctx) => {
	let body = ctx.request.body
	// 校验参数
	let v = validatorLogin(body)
	if (!v.isValid) {
		ctx.status = 400
		ctx.body = res.fail(v.errors)
	} else {
		let [err, token] = await LoginManager.adminLogin(body)
		if (err) {
			ctx.status = 400
			ctx.body = res.fail(err.msg)
		} else {
			ctx.body = res.json(token)
		}
	}
})
// 获取管理员信息
router.get('/info', new Auth(AUTH_ADMIN).m, async (ctx) => {
	let _id = ctx.auth._id
	const [err, user] = await AdminDao.detail(_id)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
	} else {
		ctx.body = res.json(user)
	}
})

module.exports = router