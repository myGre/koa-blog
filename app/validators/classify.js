const Validator = require('validator')
const { isEmpty } = require('@core/utils')

// 校验添加分类
function validatorClassifyAdd(data) {
	let errors = {}
	data.name = !isEmpty(data.name) ? data.name : "";

	if (Validator.isEmpty(data.name)) {
		errors.name = "分类名不能为空！"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
// 校验列表
function validatorClassifyList(params) {
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
	validatorClassifyAdd,
	validatorClassifyList
}