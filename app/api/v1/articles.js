const router = require("koa-router")()
const Resolve = require('@lib/helper')
const { validatorArticlesAdd } = require("@validators/articles")
const ArticlesDao = require('@dao/articles')
const { Auth } = require("@middlewares/auth")


const res = new Resolve()
router.prefix("/api/v1/articles")
// 创建文章
router.post("/create", new Auth(Auth.ADMIN).m, async (ctx) => {
	const { _id } = ctx.auth
	const body = ctx.request.body
	body.author_id = _id
	const { errors, isValid } = validatorArticlesAdd(body)
	if (!isValid) {
		ctx.status = 400
		ctx.body = res.fail(errors)
	} else {
		const [err, data] = await ArticlesDao.add(body)
		if (err) {
			ctx.status = 400
			ctx.body = res.fail(err.msg)
		} else {
			ctx.body = res.success("创建文章成功")
		}
	}

})

// 获取当前分类下的文章列表
router.get("/list", async (ctx) => {
	const params = ctx.query
	const [err, data] = await ArticlesDao.list(params)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
		console.log(err, 'err')
	} else {
		ctx.body = res.json(data)
	}
})
// 查看文章详情
router.get("/detail/:_id", async (ctx) => {
	const params = ctx.params
	const [err, data] = await ArticlesDao.detail(params._id)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
		console.log(err, 'err')
	} else {
		ctx.body = res.json(data)

	}
})

// 删除当前文章
router.delete("/del/:_id", new Auth(Auth.ADMIN).m, async (ctx) => {
	const params = ctx.params
	const [err, data] = await ArticlesDao.delete(params._id)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
	} else {
		ctx.body = res.success("删除成功")
	}
})

module.exports = router
