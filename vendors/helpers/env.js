exports.parse = (prefix, name) => {
	return process.env[prefix+'_'+name];
}