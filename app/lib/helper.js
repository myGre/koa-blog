class Resolve {
	fail(err = {}, msg = "操作失败", code = 400) {
		return {
			msg,
			code,
			err
		}
	}
	success(msg = "成功", code = 200) {
		return {
			msg,
			code
		}
	}
	json(data, msg = "成功", code = 200) {
		return {
			msg,
			code,
			data
		}
	}
}

module.exports = Resolve