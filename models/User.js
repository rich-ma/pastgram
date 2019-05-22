wwwwconst mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username :{
		type: String,
		required: true,
		index: { 
			unique: true 
		}
	},
	name: {
		type: String
	},
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	},
	avatarUrl: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('users', UserSchema);
module.exports = User;