const Validator = require('validator')
const { isEmpty } = require('@core/utils')

// 校验添加分类
function validatorCommentAdd(data) {
	let errors = {}
	data.conent = !isEmpty(data.conent) ? data.conent : "";
	data.articles_id = !isEmpty(data.articles_id) ? data.articles_id : "";


	if (Validator.isEmpty(data.conent)) {
		errors.conent = "评论内容不能为空！"
	}
	if (Validator.isEmpty(data.articles_id)) {
		errors.articles_id = "关联文章ID不能为空！"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
// 校验列表
function validatorCommentList(params) {
	params = params ? params : {}
	let errors = {}
	params.pageNo = !isEmpty(params.pageNo) ? params.pageNo : "";
	params.pageSize = !isEmpty(params.pageSize) ? params.pageSize : "";
	if (Validator.isEmpty(params.pageNo)) {
		errors.pageNo = `不能为空`
	}
	if (Validator.isEmpty(params.pageSize)) {
		errors.pageSize = `不能为空`
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}


module.exports = {
	validatorCommentAdd,
	validatorCommentList
}