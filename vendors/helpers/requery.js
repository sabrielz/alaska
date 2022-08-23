exports.getSelect = (query) => {
	return query.select || false ?
		query.select.split(',') : ['*'];
}

exports.getPagination = (query) => {
	let page = query.page - 1 || 0;
	let limit = process.env.pagination_limit || 8;
	let offset = page == 0 ? 0 : page*limit;
	
	return {
		page: page,
		limit: limit,
		offset: offset,
	}
}