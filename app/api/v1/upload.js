const router = require('koa-router')()
const Resolve = require('@lib/helper')
const { imgUpload, koabody, setImgFileStream } = require("@lib/upload")

const res = new Resolve
router.prefix('/api/v1/file')

const imgPath = "images/"

router.post('/upload', imgUpload, async (ctx) => {
	const body = ctx.request.body

	ctx.body = res.json({
		file: imgPath + ctx.req.file.filename
	})
})


router.post('/uploads', koabody, async (ctx) => {
	const file = ctx.request.files.file
	ctx.body = res.json({
		file: setImgFileStream(file)
	})
})

module.exports = router