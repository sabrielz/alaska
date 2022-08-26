const { fs, helper, utility, query, path, exceljs, form, knex } = require('./');

exports.migrate = (req, res) => {
	const M = helper.getModel(req.params.table);
	const { table } = M;

	query.migrate(M)
		.then(data => res.status(200).send({
			message: 'Table ' + table + ' migrated successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when migrating table ' + table + '!',
			err: err
		}))
}

exports.migrates = (req, res) => {
	return helper.setModels(async (M) => {
		await query.migrate(M)
			.catch(err => { })
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
			message: 'Table ' + table + ' dropped successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when dropping table ' + table + '!',
			err: err
		}))
}

exports.drops = (req, res) => {
	return helper.setModels(async (M) => {
		await query.drop(M)
			.catch(err => { })
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
			message: 'Table ' + table + ' truncated successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when truncating table ' + table + '!',
			err: err
		}))
}

exports.truncats = (req, res) => {
	return helper.setModels(async (M) => {
		await query.truncate(M)
			.catch(err => { })
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
			message: 'Table ' + table + ' seeded successfully!',
			data: M.seed
		})).catch(err => res.status(500).send({
			message: 'Some error occured when seeding table ' + table + '!',
			err: err
		}))
}

exports.seeds = (req, res) => {
	let seed;
	return helper.setModels(async (M) => {
		M.seed = await require(path.join(path.xseeds, M.name));
		seed = M.seed;
		await query.seed(M)
			.catch(err => { })
	}).then(data => res.status(200).send({
		message: 'All table seeded successfully!',
		data: data
	})).catch(err => res.status(200).send({
		message: 'Some error occured when seeding all table!',
		err: err
	}))
}

exports.import = (req, res) => {
	const M = helper.getModel(req.params.table);
	const { table } = M;

	return form.xparse(req, res, async function (fields, files) {
		let headered = [], headers = [], xheaders = [], xcontents = {}, headtype = 'input';

		if (fields.headers) {
			headers = fields.headers.split(',');
			for (let i in headers) {
				headers[i] = headers[i].trim();
			}
		} else headtype = 'first';

		if (files.file) {
			let upload = await form.xupload(res, files.file, 'others');

			let xupload = path.join(path.xstorage, upload);
			await exceljs.xlsx.readFile(xupload);
			exceljs.eachSheet((sheet, id) => {
				console.log('worksheet: '+id);
				let worksheet = exceljs.getWorksheet(id);
				utility.loop(worksheet.actualRowCount, $row => {
					let row = worksheet.getRow($row+1);
					utility.loop(row.actualCellCount, $col => {
						let col = row.getCell($col+1)
						let value = col.isHyperlink ? col.value.text : col.value;
						if (!value) return null;
	
						if (headtype == 'first' && $row == 0) {
							xheaders.push(value);
							headered.push(true);
						}
						
						if (!headered[$col]) {
							if (headers.indexOf(value) > -1) {
								xheaders.push(value);
								headered.push(true);
								xcontents[''+value] = [];
							}
						} else {
							xcontents[xheaders[$col]].push(value);
						}
					})
				})
			})

			await fs.unlink(path.join(path.xstorage, upload), err => {
				if (err) res.status(500).send({
					message: 'Some error occured when deleting file!',
					err: err
				})
			});
		}

		let length = Object.keys(xcontents).length;
		return knex(table).insert(xcontents)
		.then(data => res.status(200).send({
			message: length+' column in table '+table+' successfully inserted!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when inserting table!',
			err: err
		}));
	})
}