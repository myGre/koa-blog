const router = require("koa-router")()
const Resolve = require('@lib/helper')
const { validatorClassifyList, validatorClassifyAdd } = require("@validators/classify")
const ClassifyDao = require('@dao/classify')
const { Auth } = require("@middlewares/auth")


const res = new Resolve()
router.prefix("/api/v1/classify")
// 添加分类
router.post("/create", async (ctx) => {
	const body = ctx.request.body
	const { errors, isValid } = validatorClassifyAdd(body)
	if (!isValid) {
		ctx.status = 400
		ctx.body = res.fail(errors)
	} else {
		const [err, data] = await ClassifyDao.add(body)
		if (err) {
			ctx.status = 400
			ctx.body = res.fail(err.msg)
		} else {
			ctx.body = res.success("添加分类成功！")
		}
	}
})

// 获取分类列表
router.get("/list", async (ctx) => {
	const params = ctx.query
	const [err, data] = await ClassifyDao.list(params)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
	} else {
		ctx.body = res.json(data)
	}
})

// 删除当前分类
router.delete("/del/:_id", new Auth(Auth.ADMIN).m, async (ctx) => {
	const params = ctx.params
	const [err, data] = await ClassifyDao.delete(params._id)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
	} else {
		ctx.body = res.json(data)
	}
})



module.exports = router
