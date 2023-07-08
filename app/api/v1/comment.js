const router = require("koa-router")()
const Resolve = require('@lib/helper')
const CommentDao = require("@dao/comment")
const { Auth } = require("@middlewares/auth")
const { validatorCommentAdd, validatorCommentList } = require("@validators/comment")

const res = new Resolve()
router.prefix('/api/v1/comment')

// 创建评论
router.post("/create", new Auth().m, async (ctx) => {
	const { _id } = ctx.auth
	const body = ctx.request.body
	body.user_id = _id
	// 校验参数
	let v = validatorCommentAdd(body)
	if (!v.isValid) {
		ctx.status = 400
		ctx.body = res.fail(v.errors)
	} else {
		const [err, data] = await CommentDao.create(body)
		if (err) {
			ctx.status = 400
			ctx.body = res.fail(err)
		} else {
			ctx.body = res.success(data)
		}
	}
})
// 删除评论
router.delete("/del/:_id", new Auth().m, async (ctx) => {
	const params = ctx.params
	const [err, data] = await CommentDao.delete(params._id)
	if (err) {
		ctx.status = 400
		ctx.body = res.fail(err.msg)
	} else {
		ctx.body = res.success(data)
	}
})

module.exports = router