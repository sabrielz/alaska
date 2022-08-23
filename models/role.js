const { Model } = require('../vendors/packages');

class Role extends Model {

	static get modelName() {
		return 'role';
	}

	static tableSchema(table) {
		table.increments('id').primary();
		table.string('name');
	}

	static get relationMappings() {
		const { User } = require('./');

		return {
			users: {
				relation: Model.HasManyRelation,
				modelClass: User.pathName,
				join: {
					from: this.tableName+'.id',
					to: User.tableName+'.role_id'
				}
			}
		}
	}

}

module.exports = Role;