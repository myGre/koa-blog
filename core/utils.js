const jwt = require('jsonwebtoken');

/**
 * @Description 是否为空
 * @parameter value 任意值
 */
function isEmpty(value) {
	return (!value ||
		typeof value === "object" && Object.keys(value).length === 0 ||
		typeof value === "string" && value.trim().length === 0)
}

/**
 * @Description 生成token
 * @parameter _id 用户id
 * @parameter scope 标签
 */
function generateToken(_id, scope) {
	const secretKey = global.config.security.secretKey;
	const expiresIn = global.config.security.expiresIn;
	let token = jwt.sign({ _id, scope }, secretKey, { expiresIn: expiresIn })

	return token
}
/**
 * @Description 校验token
 * @parameter token token
 */
function verifyToken(token) {
	let data

	try {
		data = jwt.verify(token, global.config.security.secretKey)
	} catch (error) {
		console.log(error, 'error');
		return false
	}
	return data
}

module.exports = {
	isEmpty,
	generateToken,
	verifyToken
}