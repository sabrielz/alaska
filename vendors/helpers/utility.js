exports.rand = (lm) => {
	let num = Math.floor(Math.random() * lm);
	if (num <= 0 || num > lm) return exports.rand(lm);
	else return num;
};

exports.getToken = (req) => {
	return req.query.token || req.headers.token ||
	req.headers.authorization || req.headers.Authorization;
}