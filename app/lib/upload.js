const multer = require("koa-multer")
const { koaBody } = require("koa-body")
const path = require("path")
const fs = require("fs")

const root = path.join(process.cwd(), '/public/images')
// koa-multer配置
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, root); // 文件上传目录
	},
	filename(req, file, cb) {
		let fileFormat = (file.originalname).split(".");
		const fileName = Date.now() + "_" + Math.ceil(Math.random() * 100000) // 随机文件名
		cb(null, fileName + "." + fileFormat[fileFormat.length - 1]);
	}
})

const imgUpload = multer({ storage }).single("file")

// koa-body
const koabody = koaBody({
	multipart: true,
	formidable: {
		maxFileSize: 200 * 1024 * 1024  // 设置上传文件大小最大限制，默认2M
	}
})
// 文件流
function setImgFileStream(files) {
	let imagePath = ""
	const allowExtname = ['.png', '.jpg'];
	if (Array.isArray(files)) {

		for (const file of files) {
			imagePath += "," + streamFile(file)
		}
		imagePath = imagePath.slice(1)
	} else {
		imagePath = streamFile(files)
	}
	return imagePath
}
function streamFile(file) {
	const reader = fs.createReadStream(file.filepath) // 创建可读流
	const ext = file.originalFilename.split(".").pop()
	const fileName = Date.now() + "_" + Math.ceil(Math.random() * 100000) // 随机文件名
	const FilePath = path.join(root, `/${fileName}.${ext}`)
	const write = fs.createWriteStream(FilePath)

	reader.pipe(write)

	return `images/${fileName}.${ext}`
}

module.exports = {
	imgUpload,
	koabody,
	setImgFileStream
}