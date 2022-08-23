const { Model, knex } = require('../vendors/packages');

class Literasi extends Model {

	static get modelName() {
		return 'literasi';
	}

	static tableSchema(table) {
		const { User, Modul } = require('./');

		table.increments('id').primary();
		table.string('file');
		table.timestamp('tanggal').defaultTo(knex.fn.now());
		table.integer('user_id').references(User.tableName+'.id').unsigned();
		table.integer('modul_id').references(Modul.tableName+'.id').unsigned();
	}

	static get relationMappings() {
		const { User, Modul } = require('./');
		
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: this.tableName+'.user_id',
					to: User.tableName+'.id'
				}
			},
			modul: {
				relation: Model.BelongsToOneRelation,
				modelClass: Modul,
				join: {
					from: this.tableName+'.modul_id',
					to: Modul.tableName+'.id'
				}
			},
		}
	}

}

module.exports = Literasi;