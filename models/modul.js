const { Model } = require('../vendors/packages');

class Modul extends Model {

	static get modelName() {
		return 'modul';
	}

	static tableSchema(table) {
		const { User } = require('./');

		table.increments('id').primary();
		table.string('title');
		table.string('slug').unique();
		table.string('desc');
		table.string('thumbnail');
		table.string('file');
		table.string('type');
		table.integer('user_id').references(User.tableName+'.id').unsigned();
		table.timestamps(true, true, false);
	}

	static get relationMappings() {
		const { User, Literasi } = require('./');

		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: this.tableName+'.user_id',
					to: User.tableName+'.id'
				}
			},
			absens: {
				relation: Literasi.HasManyRelation,
				modelClass: Literasi,
				join: {
					from: this.tableName+'.id',
					to: Literasi.tableName+'.modul_id'
				}
			}
		}
	}
	
}

module.exports = Modul;