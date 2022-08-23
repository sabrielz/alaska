const { helper, query, path } = require('./');

const models = helper.lowmodels;

exports.migrate = (req, res) => {
	const M = helper.getModel(req.params.table);
	const { table } = M;

	query.migrate(M)
	.then(data => res.status(200).send({
		message: 'Table '+table+' migrated successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when migrating table '+table+'!',
		err: err
	}))
}

exports.migrates = (req, res) => {
	return helper.setModels(async(M) => {
		await query.migrate(M)
		.catch(err => {})
	}).then(() => res.status(200).send({
		message: 'All table migrated successfully!',
		data: {}
	})).catch(err => res.status(200).send({
		message: 'Some error occured when migrating all table!',
		err: err
	}))
}

exports.drop = (req, res) => {
	const M = helper.getModel(req.params.table);
	const { table } = M;

	query.drop(M)
	.then(data => res.status(200).send({
		message: 'Table '+table+' dropped successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when dropping table '+table+'!',
		err: err
	}))
}

exports.drops = (req, res) => {
	return helper.setModels(async(M) => {
		await query.drop(M)
		.catch(err => {})
	}, false).then(() => res.status(200).send({
		message: 'All table dropped successfully!',
		data: {}
	})).catch(err => res.status(200).send({
		message: 'Some error occured when dropping all table!',
		err: err
	}))
}

exports.truncate = (req, res) => {
	const M = helper.getModel(req.params.table);
	const { table } = M;

	query.truncate(M)
	.then(data => res.status(200).send({
		message: 'Table '+table+' truncated successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when truncating table '+table+'!',
		err: err
	}))
}

exports.truncats = (req, res) => {
	return helper.setModels(async(M) => {
		await query.truncate(M)
		.catch(err => {})
	}, false).then(() => res.status(200).send({
		message: 'All table truncated successfully!',
		data: {}
	})).catch(err => res.status(200).send({
		message: 'Some error occured when truncating all table!',
		err: err
	}))
}

exports.seed = (req, res) => {
	const M = helper.getModel(req.params.table);
	const { name, table } = M;
	M.seed = require(path.join(path.xseeds, name));

	query.seed(M)
	.then(data => res.status(200).send({
		message: 'Table '+table+' seeded successfully!',
		data: M.seed
	})).catch(err => res.status(500).send({
		message: 'Some error occured when seeding table '+table+'!',
		err: err
	}))
}

exports.seeds = (req, res) => {
	let seed;
	return helper.setModels(async(M) => {
		M.seed = await require(path.join(path.xseeds, M.name));
		seed = M.seed;
		await query.seed(M)
		.catch(err => {})
	}).then(data => res.status(200).send({
		message: 'All table seeded successfully!',
		data: data
	})).catch(err => res.status(200).send({
		message: 'Some error occured when seeding all table!',
		err: err
	}))
}

// const seed = require('../seeds/'+req.params.table);
// let model = cfg.model[req.params.table];
// let table = model.tableName;

// knex(table).insert(seed)