const { seed, env, helper } = require('./');

const xseed = () => {
	return {
		user_id: helper.rand(env.parse('seed', 'user')),
		modul_id: helper.rand(env.parse('seed', 'modul')),
	}
}

module.exports = seed('literasi', xseed);