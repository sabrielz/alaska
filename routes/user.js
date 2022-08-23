module.exports = app => {

	const Controller = require('../controllers/user');

	app.get('/user', Controller.all);

	app.get('/user/count', Controller.count);

	app.get('/user/nis/:nis', Controller.nis);

	app.get('/user/:id', Controller.get);

	app.put('/user/:id', Controller.update);

	app.delete('/user/:id', Controller.destroy);

}