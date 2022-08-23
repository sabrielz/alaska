const { Model, knex } = require('../vendors/packages');

class Absen extends Model {

	static get modelName() {
		return 'absen';
	}

	static tableSchema(table) {
		const { User } = require('./');

		table.increments('id').primary();
		table.timestamp('tanggal').defaultTo(knex.fn.now());
		table.integer('user_id').references(User.tableName+'.id').unsigned();
	}

	static get relationMappings() {
		const { User } = require('./');
		
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: this.tableName+'.user_id',
					to: User.tableName+'.id'
				}
			}
		}
	}

}

module.exports = Absen;