const Validator = require('validator')
const { isEmpty } = require('@core/utils')
// 注册校验
function validatorRegister(data) {
	let errors = {}
	data.nickName = !isEmpty(data.nickName) ? data.nickName : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.nickName)) {
		errors.nickName = "用户名不能为空！"
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = "邮箱不能为空！"
	} else {
		if (!Validator.isEmail(data.email)) {
			errors.email = "邮箱不合法！"
		}
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "密码不能为空"
	} else {
		if (!Validator.isLength(data.password, { min: 6, max: 12 })) {
			errors.password = "密码的长度不能小于6位并且不能大于12位！";
		}
	}

	return {
		errors,
		isValid: isEmpty(errors) // 判断是否有错误
	}
}
// 登录校验
function validatorLogin(data) {
	let errors = {}
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.email)) {
		errors.email = "邮箱不能为空！"
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = "邮箱不合法！"
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "密码不能为空"
	} else {
		if (!Validator.isLength(data.password, { min: 6, max: 12 })) {
			errors.password = "密码的长度不能小于6位并且不能大于12位！";
		}
	}

	return {
		errors,
		isValid: isEmpty(errors) // 判断是否有错误
	}
}
// 校验参数
function validatorParams(_id) {
	let errors = {}
	if (Validator.isEmpty(_id)) {
		errors._id = "参数不能为空"
	}
	return {
		errors,
		isValid: isEmpty(errors) // 判断是否有错误
	}
}
// 获取用户列表
function validatorUserList(params) {
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
	validatorRegister,
	validatorLogin,
	validatorParams,
	validatorUserList
}