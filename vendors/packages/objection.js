const { Model } = require('objection');
const { knex, pluralize, path } = require('./');

class BaseModel extends Model {
	static get tableName() {
		return pluralize.plural(this.modelName);
	}

	static get idColumn() {
		return 'id';
	}

	static get pathName() {
		return path.join(path.xmodels, this.modelName);
	}

	static get relationGraph() {
		let relations = this.relationMappings, relate = {};
		for (let key in relations) {
			relate[key] = true;
		}
		return relate;
	}
}

BaseModel.knex(knex);

module.exports = BaseModel;