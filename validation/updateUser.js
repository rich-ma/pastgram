const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.username = validText(data.username) ? data.username : '';
	data.name = validText(data.name) ? data.name : '';
	data.bio = validText(data.bio) ? data.bio : '';

	if (!Validator.isLength(data.username, {
			min: 2,
			max: 15
		})) {
		errors.username = 'Username must be between 2 and 15 characters';
	}

	if (!Validator.isLength(data.name, {
			min: 0,
			max: 30
		})) {
		errors.name = 'name must be between 0 and 30 characters';
	}

	if (!Validator.isLength(data.bio, {
			min: 0,
			max: 300
		})) {
		errors.name = 'bio must be between 0 and 300 characters';
	}

	if (Validator.isEmpty(data.username)) {
		errors.username = 'Username field is required';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	};
};
