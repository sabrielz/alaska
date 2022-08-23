module.exports = app => {
	
	const Controller = require('../controllers/auth');
	
	app.post('/register', Controller.register);

	app.post('/login', Controller.login);

	app.post('/verify', Controller.check);

}