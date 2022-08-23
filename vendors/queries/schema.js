const { knex } = require('../packages');

exports.migrate = async({ Model, table }) => {
	return await knex.schema.createTable(
		table, table => Model.tableSchema(table)
	);
}

exports.drop = async({ table }) => {
	return await knex.schema.dropTable(table)
}

exports.truncate = async({ table }) => {
	return await knex.raw('TRUNCATE TABLE '+table);
}

exports.seed = async({ table, seed }) => {
	return await knex(table).insert(seed);
}
