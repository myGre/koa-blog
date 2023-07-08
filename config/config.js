module.exports = {
	// 数据库配置
	database: {
		dbName: "mydb",
		dbUser: '',
		dbPwd: '',
		dbHost: "",
	},
	// jwt配置 
	security: {
		secretKey: 'secretKey',
		// 过期时间4小时
		expiresIn: 60 * 60 * 4
	}
}