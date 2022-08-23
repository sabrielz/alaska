module.exports = app => {

	const Auth = require('../controllers/auth');

	const Controller = require('../controllers/literasi');

	app.use('/literasi', Auth.verify);

	app.get('/literasi', Controller.all);

	app.get('/literasi/count', Controller.count);

	app.get('/literasi/:id', Controller.get);

	app.post('/literasi', Controller.store);

	app.put('/literasi/:id', Controller.update);

	app.delete('/literasi/:id', Controller.destroy);

}