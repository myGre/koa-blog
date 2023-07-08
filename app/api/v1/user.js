const router = require('koa-router')()
const { validatorRegister, validatorLogin, validatorParams, validatorUserList } = require('@validators/user')
const UserDao = require("@dao/user")
const { LoginManager } = require("@server/login")
const Resolve = require('@lib/helper')
const { Auth } = require("@middlewares/auth")

const AUTH_USER = Auth.USER; // token签名

const res = new Resolve()

router.prefix('/api/v1/user')
// 普通用户注册
router.post('/register', async (ctx) => {
	const body = ctx.request.body
	const { errors, isValid } = validatorRegister(body)
	if (!isValid) {
		ctx.status = 400
		ctx.body = res.fail(errors)
	} else {
		let [err, token] = await UserDao.create(body)
		if (err) {
			ctx.status = 400
			ctx.body = res.fail(err.msg)
		} else {
			ctx.body = res.json(token)
		}
	}
})
// 普通用户登录
router.post('/login', async (ctx) => {
	const body = ctx.request.body
	const { errors, isValid } = validatorLogin(body)
	if (!isValid) {
		ctx.status = 400
		console.log(errors, 'errors');
		ctx.body = res.fail(errors)
	} else {
		let [err, token] = await LoginManager.userLogin(body)
		if (err) {
			ctx.status = 400
			ctx.body = res.fail(err.msg)
			console.log(err, 'err');

		} else {
			ctx.body = res.json(token)
		}
	}
})
// 获取当前用户信息
router.get('/info', new Auth(AUTH_USER).m, async (ctx) => {
	const _id = ctx.auth._id
	let [err, user] = await UserDao.detail(_id)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
	} else {
		ctx.body = res.json(user)
	}
})

// 删除单个用户
router.delete('/del/:_id', new Auth(Auth.ADMIN).m, async (ctx) => {
	const params = ctx.params
	const { errors, isValid } = validatorParams(params._id)
	if (!isValid) {
		ctx.status = 400
		ctx.body = res.fail(errors)
	} else {
		const [err, data] = await UserDao.delete(params._id)
		if (err) {
			ctx.status = 400
			ctx.body = res.fail(err.msg)
		} else {
			ctx.body = res.success()
		}
	}
})
// 获取用户列表
router.get('/list', new Auth(Auth.ADMIN).m, async (ctx) => {
	const qarams = ctx.query

	const [err, data] = await UserDao.list(qarams)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
	} else {
		ctx.body = res.json(data)
	}
})

module.exports = router