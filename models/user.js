const { Model, hash } = require('../vendors/packages');

class User extends Model {

	static get modelName() {
		return 'user';
	}

	static tableSchema(table) {
		const { Role } = require('./');

		table.increments('id').primary();
		table.string('nama');
		table.string('email').unique();
		table.integer('nis').unique();
		table.string('password').defaultTo(hash('123456'));
		table.string('ttl');
		table.string('sekolah');
		table.text('alasan');
		table.string('avatar');
		table.string('hp');
		table.integer('role_id').references(Role.tableName+'.id').unsigned().defaultTo(1);
	}

	static get relationMappings() {
		const { Modul, Absen, Literasi, Role } = require('./');
		
		return {
			moduls: {
				relation: Model.HasManyRelation,
				modelClass: Modul,
				join: {
					from: this.tableName+'.id',
					to: Modul.tableName+'.user_id'
				}
			},
			absens: {
				relation: Model.HasManyRelation,
				modelClass: Absen,
				join: {
					from: this.tableName+'.id',
					to: Absen.tableName+'.user_id'
				}
			},
			literasy: {
				relation: Model.HasManyRelation,
				modelClass: Literasi,
				join: {
					from: this.tableName+'.id',
					to: Literasi.tableName+'.user_id'
				}
			},
			role: {
				relation: Model.BelongsToOneRelation,
				modelClass: Role,
				join: {
					from: this.tableName+'.role_id',
					to: Role.tableName+'.id'
				}
			},
		}
	}

}

module.exports = User;