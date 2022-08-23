const { path } = require('../packages');
const models = require(path.xmodels);
module.exports = models;
module.exports.list = Object.keys(models);