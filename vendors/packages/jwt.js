const jwt = require('jsonwebtoken');

jwt.secretKey = process.env.jwt_secretkey || 'smkmuhbligo';
jwt.algorithm = process.env.jwt_algorithm || 'HS256';
jwt.expiresIn = process.env.jwt_expiresin || '3h';

module.exports = jwt;