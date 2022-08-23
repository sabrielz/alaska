const { seed, helper, env, faker, sluger } = require('./');

let types = ['', 'ebook', 'video'];

const xseed = () => {
	let title = faker({ min: 4, max: 6, join: ' '});
	let desc = faker({min: 15, max: 25, join: ' '});
	let slug = sluger(title, '-');
	let type = types[helper.rand(types.length)];
	return {
		title: title,
		slug: slug,
		desc: desc,
		thumbnail: 'modul/seed.jpg',
		file: 'modul/seed.jpg',
		type: type,
		user_id: helper.rand(env.parse('seed', 'user')),
	}
}

module.exports = seed('modul', xseed);