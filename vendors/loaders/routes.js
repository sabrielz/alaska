const { path, fs } = require('../packages');

module.exports = app => {
	
	fs.readdir(path.xroutes, (err, files) => {
		if (err) throw err;
		for (let file of files) {
			if (file == 'index.js') continue;
			require(path.join(path.xroutes, file))(app);
		}
	})

}