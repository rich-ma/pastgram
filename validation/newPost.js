const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePostInput(data){
	let errors = {};

	data.text = validText(data.text) ? data.text : '';
	data.url = validText(data.url) ? data.url : '';

	if(!Validator.isURL(data.url)){
		errors.url = "URL is invalid.";
	} // useless will be redundant after aws

	if(!Validator.isEmpty(data.text)){
		errors.text = "Text field is required.";
	}

	return{
		errors,
		isValid: Object.keys(errors).length === 0
	}
}