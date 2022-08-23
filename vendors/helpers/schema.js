const { path } = require('../packages');

exports.getModel = (name) => {
	const Model = require(path.join(path.xmodels, name));

	let model = Model.modelName;
	let table = Model.tableName;
	let capname = model[0].toUpperCase()+model.slice(1)
	return {
		Model: Model,
		name: model,
		capname: capname,
		table: table
	}
}

let models = process.env.tbl_priority.split(',') || Object.keys(require(path.xmodels));
// let xmodels = [];
// models.map(model => xmodels.push(model.toLowerCase()));
exports.upmodels = models;
// exports.lowmodels = xmodels;

exports.setModels = async(next, asc) => {
	models = asc || true ? models : models.reverse();
	for (let model of models) {
		const M = await exports.getModel(model);
		next(M)
	}
}