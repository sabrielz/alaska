module.exports = app => {

	let Controller = require('../controllers/api');

	app.get('/api/migrate', Controller.migrates);

	app.get('/api/migrate/:table', Controller.migrate);

	app.get('/api/drop', Controller.drops);

	app.get('/api/drop/:table', Controller.drop);

	// app.get('/api/remigrate/:table', Controller.remigrate);

	app.get('/api/truncate', Controller.truncats);

	app.get('/api/truncate/:table', Controller.truncate);

	app.get('/api/seed', Controller.seeds);

	app.get('/api/seed/:table', Controller.seed);

}