const path = require('../packages/path');

const env = require('dotenv').config({
	override: true,
	path: path.join(path.xbase, '.env'),
	debug: false,
	encoding: 'latin1'
});

module.exports = env;