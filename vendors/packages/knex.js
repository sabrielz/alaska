const config = {
	client: 'mysql',
	connection: {
		host : process.env.db_host || 'localhost',
		port : process.env.db_port || 3306,
		user : process.env.db_username || 'root',
		password : process.env.db_password || '',
		database : process.env.db_name || 'perpus',
	}
};

module.exports = require('knex')(config);

// knex({
// 	client: 'mysql',
// 	debug: boolean,
// client: string | typeof Client,
// dialect: string,
// version: string,
// connection: string | StaticConnectionConfig | ConnectionConfigProvider,
// pool: PoolConfig,
// migrations: MigratorConfig,
// seeds: {
// 		extension?: string;
// 		directory?: string | readonly string[];
// 		loadExtensions?: readonly string[];
// 		specific?: string;
// 		timestampFilenamePrefix?: boolean;
// 		recursive?: boolean;
// 		sortDirsSeparately?: boolean;
// 		stub?: string;
// 	},
	// acquireConnectionTimeout: number,
	// useNullAsDefault: boolean,
	// // searchPath: string | readonly string[],
	// asyncStackTraces: boolean,
	// log: Logger,
// 	connection: {
// 		host: string,
// 		port: number,
// 		localAddress: string,
// 		socketPath: string,
// 		user: string,
// 		password: string,
// 		database: string,
// 		charset: string,
// 		timezone: string,
// 		connectTimeout: number,
// 		stringifyObjects: boolean,
// 		insecureAuth: boolean,
// 		typeCast: any,
// 		supportBigNumbers: boolean,
// 		bigNumberStrings: boolean,
// 		dateStrings: boolean,
// 		debug: boolean,
// 		trace: boolean,
// 		multipleStatements: boolean,
// 		flags: string,
// 		ssl: string | MariaSslConfiguration,
// 		decimalNumbers: boolean,
// 	}
// })