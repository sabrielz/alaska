const { IncomingForm } = require('formidable');
const { path, fs } = require('./');
const crypto = require('crypto');

const form = new IncomingForm({
	multiples: true,
});

form.xupload = (res, file, subfolder) => {
	let xparse = file.originalFilename.split('.');
	let xext = xparse[xparse.length-1];
	let xrand = crypto.randomBytes(32).toString('hex');
	let xname = xrand+'.'+xext;
	
	let xold = file.filepath;
	let xnew = path.join(path.xstorage, subfolder, xname);

	fs.rename(xold, xnew, err => {
		if (err) return res.status(500).send({
			message: 'Some error occured when uploading file!',
			err: err
		})
	})

	return subfolder+'/'+xname;
}

form.xparse = (req, res, next) => {
	return form.parse(req, function(err, fields, files) {
		if (!fields && !files) {
			return res.status(404).send({
				message: 'Require content to process request!',
				err: {}
			});
		}

		if (err) return res.status(500).send({
			message: 'Some error occured when parsing form!',
			err: err
		})

		next(fields, files);
	})
}

module.exports = form;