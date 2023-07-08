
module.exports = () => {
	const mongoose = require("mongoose");
	const { dbName, dbUser, dbPwd, dbHost } = global.config.database

	const db_name = dbName; // 数据库名字
	const db_user = dbUser || 'hwc'; // 数据库用户名
	const db_pwd = dbPwd || '123456'; // 数据库密码
	const db_host = dbHost || '175.178.191.198'; // 数据库地址

	// mongoose.connect(`mongodb://${db_user}:${db_pwd}@${db_host}:27017/${db_name}?authSource=admin`, {
	//   useNewUrlParser: true,
	//   useFindAndModify: true,
	//   useUnifiedTopology: true,
	//   useCreateIndex: true,
	//   useFindAndModify: true
	// });
	mongoose.connect(`mongodb://localhost:27017/${db_name}`, {
		useNewUrlParser: true,
	}).then(() => {
		console.log('数据库连接成功')
	})
		.catch((err) => {
			console.log('数据库连接失败!' + err);
		});
};
