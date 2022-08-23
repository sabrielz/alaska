const { seed, helper, env, faker, sluger, hash } = require('./');

const xseed = () => {
	let nama = faker({ min: 2, max: 3, join: ' '});
	let email = sluger(nama, '') + '@gmail.com';
	let avatar = 'avatar/default'+helper.rand(3)+'.png';
	return {
		nama: nama,
		email: email,
		nis: helper.rand(999999),
		password: hash('123456'),
		ttl: "Pekalongan",
		sekolah: "SMKMUHBLIGO",
		alasan: "Debugging",
		avatar: avatar,
		role_id: helper.rand(env.parse('seed', 'role'))
	};
}

module.exports = seed('user', xseed, [{
	nama: "Sabriel",
	email: "sabriel@gmail.com",
	nis: 123456,
	password: hash('123456'),
	ttl: "Pekalongan",
	sekolah: "SMKMUHBLIGO",
	alasan: "Debugging",
	avatar: 'avatar/default'+helper.rand(3)+'.png',
	role_id: 3
}]);