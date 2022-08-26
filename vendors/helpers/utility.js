exports.rand = (lm) => {
	let num = Math.floor(Math.random() * lm);
	if (num <= 0 || num > lm) return exports.rand(lm);
	else return num;
};

exports.getToken = (req) => {
	return req.query.token || req.headers.token ||
	req.headers.authorization || req.headers.Authorization;
}

exports.isPromise = (func) => {
	// if (typeof func === 'object') {
	// 	if (typeof func.then === 'function') {
	// 		return true;
	// 	} 
	// } return false;
	if (typeof func === 'object' && typeof func.then === 'function') {
		return true;
	} return false;
}

exports.loop = (count, next) => {
	for (var i = 0; i < count; i++) next(i);
}