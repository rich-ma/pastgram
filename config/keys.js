// keys.js
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./keys_prod');
} else {
	console.log('development');
	module.exports = require('./keys_dev');
}