const packages = require('../vendors/packages');
const helpers = require('../vendors/helpers');

const seed = (name, content, predefine) => {
	let limit = helpers.env.parse('seed', name);
	let seeds = predefine || [];

	for (let i = 0; i < limit; i++) {
		// console.log(content);
		let seed = typeof content == 'function' ? content() : content;
		seeds.push(seed);
	} 

	return seeds;
}

module.exports = packages;
module.exports.helpers = helpers;
module.exports.helper = helpers.utility;
module.exports.env = helpers.env;
module.exports.seed = seed;