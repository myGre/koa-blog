const basicAuth = require("basic-auth")
const { verifyToken } = require("@core/utils")
const Resolve = require('@lib/helper')

const res = new Resolve()

class Auth {
	constructor(level) {
		this.level = level || 1 // 权限等级

		Auth.USER = 8;
		Auth.ADMIN = 16;
		Auth.SPUSER_ADMIN = 32;
	}

	get m() {
		// 校验token
		return async (ctx, next) => {
			const tokenToken = basicAuth(ctx.req)
			let errMsg = ""
			
			tokenToken ? !(verifyToken(tokenToken.name)) && (errMsg = "token已过期") : errMsg = "需要携带token！"

			if (errMsg) {
				ctx.status = 401
				ctx.body = new global.errs.AuthFailed(errMsg)
			} else {
				const { _id, scope } = verifyToken(tokenToken.name)
				ctx.auth = {
					_id,
					scope
				}
				await next()
				if (this.level > scope) {
					ctx.status = 401
					ctx.body = new global.errs.AuthFailed("权限等级不足")
				}
			}
		}
	}
}

module.exports = {
	Auth
}