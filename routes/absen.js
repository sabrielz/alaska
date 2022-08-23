module.exports = app => {

	const Auth = require('../controllers/auth');

	const Controller = require('../controllers/absen');

	app.use('/absen', Auth.verify);

	app.get('/absen', Controller.all);

	app.get('/absen/count', Controller.count);

	app.get('/absen/:id', Controller.get);

	app.post('/absen', Controller.store);

	app.put('/absen/:id', Controller.update);

	app.delete('/absen/:id', Controller.destroy);

}