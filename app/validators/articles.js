const Validator = require('validator')
const { isEmpty } = require('@core/utils')

function validatorArticlesAdd(data) {
	let errors = {}
	data.title = !isEmpty(data.title) ? data.title : "";
	data.description = !isEmpty(data.description) ? data.description : "";
	data.author_id = !isEmpty(data.author_id) ? data.author_id : "";
	data.content = !isEmpty(data.content) ? data.content : "";
	data.classify_id = !isEmpty(data.classify_id) ? data.classify_id : "";

	if (Validator.isEmpty(data.title)) {
		errors.title = "文章名称不能为空！"
	}
	if (Validator.isEmpty(data.description)) {
		errors.description = "文章简介不能为空！"
	}
	if (Validator.isEmpty(data.author_id)) {
		errors.author_id = "作者ID不能为空！"
	}
	if (Validator.isEmpty(data.content)) {
		errors.content = "文章内容不能为空！"
	}
	if (Validator.isEmpty(data.classify_id)) {
		errors.classify_id = "所属分类ID不能为空！"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}


module.exports = {
	validatorArticlesAdd
}