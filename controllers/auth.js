const { form, jwt, hash } = require('../vendors/packages');
const { schema, utility } = require('../vendors/helpers');
const { Model, capname, name } = schema.getModel('user');

exports.register = (req, res) => {
	return form.xparse(req, res, function(fields, files) {
		if (files.avatar) {
			fields.avatar = form.xupload(res, files.avatar, 'avatar');
		}

		return Model.query().insertAndFetch(fields)
		.then(data => res.status(200).send({
			message: capname+' registered successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when registering '+name+'!',
			err: err
		}));
	});
}

exports.login = (req, res) => {
	return form.xparse(req, res, function(fields, files) {
		let profile = {};
	
		return Model.query().where({
			nis: fields.nis,
			password: hash(fields.password)
		}).then(data => {
			if (!data.length) return res.status(404).send({
				message: 'User not found!',
				err: data
			});
	
			profile = data[0];
			require('./absen').login(profile.id)
			.then(err => {
				if (err) return res.status(500).send({
					message: 'Some error occured when inserting absen!',
					err: err
				})
	
				return jwt.sign({ data: profile }, jwt.secretKey, {
					expiresIn: jwt.expiresIn,
					algorithm: jwt.algorithm
				}, (err, token) => {
					if (err) return res.status(500).send({
						message: 'Some error occured when generating token!',
						err: err
					});

					return res.status(200).send({
						message: 'User finded successfully!',
						token: token,
						data: profile
					})
				})
			}).catch(err => res.status(500).send({
				message: 'Some error occured when trying to absen!',
				err: err
			}));
		}).catch(err => res.status(500).send({
			message: 'Some error occured when finding user!',
			err: err
		}));
	})
}

exports.check = (req, res) => {
	return form.xparse(req, res, function(fields, files) {
		let token = utility.getToken(req);

		if (!token) return res.status(403).send({
			message: 'Required token to continue!',
			err: {}
		});
	
		jwt.verify(token, jwt.secretKey, {
			algorithm: jwt.algorithm,
		}, (err, data) => {
			if (err) return res.status(500).send({
				message: 'Failed to authenticate token!',
				err: err
			});
	
			return res.status(200).send({
				message: 'Token authenticated successfully!',
				data: data.data
			});
		})
	})
}

exports.verify = (req, res, next) => {
	let token = utility.getToken(req);

	if (!token) return res.status(403).send({
		message: 'Required token to continue!',
		err: {}
	})

	jwt.verify(token, jwt.secretKey, {
		algorithm: jwt.algorithm,
	}, function(err, decoded) {
		if (err) return res.status(500).send({
			message: 'Failed to authenticate token!',
			err: err
		});

		req.decoded = decoded;
		return next()
	})
}