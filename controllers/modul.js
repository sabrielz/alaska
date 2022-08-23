const { helper, requery, form } = require('.');
const { Model, table, name, capname } = helper.getModel('modul');

module.exports = (type) => {
	let capname = type[0].toUpperCase()+type.slice(1);

	this.xall = (req, res) => {
		let select = requery.getSelect(req.query);
	
		if (req.query.page) {
			return this.xpaginate(req, res, type);
		}
	
		return Model.query().select(select)
		.where({ type: type })
		.withGraphFetched(Model.relationGraph)
		.orderBy('id', 'DESC')
		.then(data => {
			if (!data.length) return res.status(404).send({
				message: 'Empty table!',
				err: {}
			})
	
			return res.status(200).send({
				message: data.length+' '+type+'s selected successfully!',
				data: data
			});
		}).catch(err => res.status(500).send({
			message: 'Some error occured when selecting '+type+'s!',
			err: err
		}))
	}
	
	this.xpaginate = (req, res, type) => {
		let select = requery.getSelect(req.query);
		let { limit, offset } = requery.getPagination(req.query);

		return Model.query().select(select)
		.where({ type: type })
		.offset(offset).limit(limit)
		.withGraphFetched(Model.relationGraph)
		.orderBy('id', 'DESC')
		.then(data => {
			if (!data.length) return res.status(404).send({
				message: 'Empty '+type+'!',
				err: {}
			})
	
			return res.status(200).send({
				message: data.length + ' '+type+'s selected successfully!',
				data: data
			})
		}).catch(err => {
			return res.status(500).send({
				message: 'Some error occured when paginating '+type+'s!',
				err: err
			})
		})
	}
	
	this.xcount = (req, res) => {
		return Model.query()
		.where({ type: type })
		.count('id as count')
		.then(data => res.status(200).send({
			message: 'Table '+type+'s successfully counted!',
			data: data[0].count
		})).catch(err => res.status(500).send({
			message: 'Some error occured when counting table '+type+'s!',
			err: err
		}))
	}
	
	this.xget = (req, res) => {
		let id = req.params.id;
	
		return Model.query()
		.where({ type: type, id: id })
		.withGraphFetched(Model.relationGraph)
		.then(data => {
			if (!data.length) return res.status(404).send({
				message: 'No '+type+' found with id '+id+'!',
				err: {}
			})
	
			return res.status(200).send({
				message: capname+' finded successfully!',
				data: data[0]
			})
		}).catch(err => res.status(500).send({
			message: 'Some error occured when selecting '+type+'!',
			err: err
		}))
	}
	
	this.xstore = (req, res) => {
		return form.xparse(req, res, function(fields, files) {
			if (files.thumbnail) {
				fields.thumbnail = form.xupload(res, files.thumbnail, 'thumbnail');
			} if (files.file) {
				fields.file = form.xupload(res, files.file, 'modul');
			}

			fields.type = type;
			
			return Model.query().insertAndFetch(fields)
			.then(data => res.status(200).send({
				message: capname+' stored successfully!',
				data: data
			})).catch(err => res.status(500).send({
				message: 'Some error occured when storing '+type+'!',
				err: err
			}));
		});
	}
	
	this.xupdate = (req, res) => {
		let id = req.params.id;
	
		return form.xparse(req, res, function(fields, files) {
			if (files.thumbnail) {
				fields.thumbnail = form.xupload(res, files.thumbnail, 'thumbnail');
			} if (files.file) {
				fields.file = form.xupload(res, files.file, 'modul');
			}

			fields.type = type;
			
			return Model.query()
			.where({ type: type, id: id })
			.updateAndFetch(fields)
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
				message: 'Some error occured when updating '+type+'!',
				err: err
			}));
		})
	}
	
	this.xdestroy = (req, res) => {
		let id = req.params.id;
	
		return Model.query()
		.where({ type: type, id: id }).delete()
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
			message: 'Some error occured when deleting '+type+'!',
			err: err
		}))
	}

	return this;
}

module.exports.all = (req, res) => {
	let select = requery.getSelect(req.query);

	if (req.query.page) {
		return module.exports.paginate(req, res);
	}

	return Model.query().select(select)
	.withGraphFetched(Model.relationGraph)
	.orderBy('id', 'DESC')
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

module.exports.paginate = (req, res) => {
	let select = requery.getSelect(req.query);
	let { limit, offset } = requery.getPagination(req.query);

	return Model.query().select(select)
	.offset(offset).limit(limit)
	.withGraphFetched(Model.relationGraph)
	.orderBy('id', 'DESC')
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

module.exports.count = (req, res) => {
	return Model.query().count('id as count')
	.then(data => res.status(200).send({
		message: 'Table '+table+' successfully counted!',
		data: data[0].count
	})).catch(err => res.status(500).send({
		message: 'Some error occured when counting table '+table+'!',
		err: err
	}))
}

module.exports.get = (req, res) => {
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

module.exports.store = (req, res) => {
	return form.xparse(req, res, function(fields, files) {
		if (files.thumbnail) {
			fields.thumbnail = form.xupload(res, files.thumbnail, 'thumbnail');
		} if (files.file) {
			fields.file = form.xupload(res, files.file, 'modul');
		}
		
		return Model.query().insertAndFetch(fields)
		.then(data => res.status(200).send({
			message: capname+' stored successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when storing '+name+'!',
			err: err
		}));
	});
}

module.exports.update = (req, res) => {
	let id = req.params.id;

	return form.xparse(req, res, function(fields, files) {
		if (files.thumbnail) {
			fields.thumbnail = form.xupload(res, files.thumbnail, 'thumbnail');
		} if (files.file) {
			fields.file = form.xupload(res, files.file, 'modul');
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

module.exports.destroy = (req, res) => {
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