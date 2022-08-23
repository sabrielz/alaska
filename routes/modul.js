module.exports = app => {

	let types = ['ebook', 'video'];

	const Auth = require('../controllers/auth');

	const Controller = require('../controllers/modul');

	app.use('/modul', Auth.verify);

	app.get('/modul', Controller.all);

	app.get('/modul/count', Controller.count);

	app.get('/modul/:id', Controller.get);

	app.post('/modul', Controller.store);

	app.put('/modul/:id', Controller.update);

	app.delete('/modul/:id', Controller.destroy);

	types.map(type => {

		let base = '/'+type;
		
		const Controller = require('../controllers/modul')(type);

		app.use(base, Auth.verify);
	
		app.get(base, Controller.xall);
	
		app.get(base+'/count', Controller.xcount);
	
		app.get(base+'/:id', Controller.xget);
	
		app.post(base, Controller.xstore);
	
		app.put(base+'/:id', Controller.xupdate);
	
		app.delete(base+'/:id', Controller.xdestroy);

	})

}