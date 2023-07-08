const Router = require('koa-router')
const requireDirectory = require("require-directory")
const path = require('path')

class InitManager {
	static initCore(app) {
		// 入口方法
		InitManager.app = app
		InitManager.loadConfig()
		InitManager.loadHttpException()
		// 连接数据库
		require('../core/db')()
		InitManager.initLoadRouters()
	}
	// 加载全部路由
	static initLoadRouters() {
		// 绝对路径
		const apiDirectory = path.join(process.cwd(), '/app/api')
		// const apiDirectory = '../app/api'
		requireDirectory(module, apiDirectory, {
			visit: whenLoadModule
		})
		// 判断是否属于路由文件
		function whenLoadModule(obj) {
			if (obj instanceof Router) {
				InitManager.app.use(obj.routes())
			}
		}
	}
	// 把配置文件挂载到global上
	static loadConfig() {
		const configPath = path.join(process.cwd(), '/config/config.js')
		const config = require(configPath)
		global.config = config
	}
	// error
	static loadHttpException() {
		const errors = require('./http-exception')
		global.errs = errors
	}
}

module.exports = InitManager