const jwt = require('jsonwebtoken');

/**
 * @description Generates a token for the user
 */

const generateToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '10d',
	});
};

module.exports = generateToken;