const { seed, helper, env } = require('./');

const xseed = () => {
	return {
		user_id: helper.rand(env.parse('seed', 'user'))
	}
}

module.exports = seed('absen', xseed);