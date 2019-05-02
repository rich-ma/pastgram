const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const PostSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true
	},
	text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	url: {
		type: String,
		required: true
	},
	likes: {
		type: [Schema.Types.ObjectId] //UserIds
	},
	comments: {
		type: [String]
	}
});

const Post = mongoose.model('posts', PostSchema);
module.exports = Post;