const { app } = require('../packages');

require('./routes')(app);

const name = process.env.app_name || 'Norzeim';
const port = process.env.app_port || 7381;
const host = process.env.app_host || 'localhost';

app.listen(port, host, () => {
	console.log(`${name} listening on ${host}:${port}.`);
});

module.exports = app;