const { helper, requery, form } = require('./');
const { Model, table, name, capname } = helper.getModel('user');

exports.all = (req, res) => {
	let select = requery.getSelect(req.query);

	if (req.query.page) {
		return exports.paginate(req, res);
	}

	return Model.query().select(select)
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'Empty table!',
			err: {}
		})

		return res.status(200).send({
			message: data.length+' '+table+' selected successfully!',
			data: data
		});
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting '+table+'!',
		err: err
	}))
}

exports.paginate = (req, res) => {
	let select = requery.getSelect(req.query);
	let { limit, offset } = requery.getPagination(req.query);

	return Model.query().select(select)
	.offset(offset).limit(limit)
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'Empty '+name+'!',
			err: {}
		})

		return res.status(200).send({
			message: data.length + ' '+table+' selected successfully!',
			data: data
		})
	}).catch(err => {
		return res.status(500).send({
			message: 'Some error occured when paginating '+table+'!',
			err: err
		})
	})
}

exports.count = (req, res) => {
	return Model.query().count('id as count')
	.then(data => res.status(200).send({
		message: 'Table '+table+' successfully counted!',
		data: data[0].count
	})).catch(err => res.status(500).send({
		message: 'Some error occured when counting table '+table+'!',
		err: err
	}))
}

exports.get = (req, res) => {
	let id = req.params.id;

	return Model.query().findById(id)
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data) return res.status(404).send({
			message: 'No '+name+' found with id '+id+'!',
			err: {}
		})

		return res.status(200).send({
			message: capname+' finded successfully!',
			data: data
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting '+name+'!',
		err: err
	}))
}

exports.update = (req, res) => {
	let id = req.params.id;

	return form.xparse(req, res, function(fields, files) {
		if (files.avatar) {
			fields.avatar = form.xupload(res, files.avatar, 'avatar');
		}

		return Model.query().updateAndFetchById(id, fields)
		.then(data => {
			if (!data) return res.status(404).send({
				message: capname+' not found with id '+id+'!',
				err: {}
			})

			return res.status(200).send({
				message: capname+' updated successfully!',
				data: data
			})
		}).catch(err => res.status(500).send({
			message: 'Some error occured when updating '+name+'!',
			err: err
		}));
	})
}

exports.destroy = (req, res) => {
	let id = req.params.id;

	return Model.query().deleteById(id)
	.then(data => {
		if (!data) return res.status(404).send({
			message: capname+' not found with id '+id+'!',
			err: {}
		})
		
		return res.status(200).send({
			message: capname+' deleted successfully!',
			data: data
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when deleting '+name+'!',
		err: err
	}))
}

// Advanced Feature
exports.nis = (req, res) => {
	let nis = req.params.nis;

	return Model.query().where({ nis: nis })
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: capname+' not found with nis '+nis+'!',
			err: {}
		})

		return res.status(200).send({
			message: capname+' finded successfully!',
			data: data[0]
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting '+name+'!',
		err: err
	}))
}