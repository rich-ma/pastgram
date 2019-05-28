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
	likes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatarUrl: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
	
});

const Post = mongoose.model('posts', PostSchema);
module.exports = Post;