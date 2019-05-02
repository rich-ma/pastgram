const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/test', (req, res) => res.json({msg: 'This is the posts route'}));

router.post('/', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	const post = req.body;
	const user = req.user;
	if(post.userId + '' ===  user._id + ''){
		const newPost = new Post({
			userId: post.userId,
			text: post.text,
			url: post.url //need to fix this after AWS s3 upload
		});
		newPost.save().catch(err => console.log(err));
		res.json({msg: "Success!"})
	} else {
		res.json({
			msg: "You don't have permission to post that."
		});
	}
})

//index posts
router.get('/', (req, res) => {
	Post.find()
		.sort({date: -1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ nopostsfound: "No posts found." }))
})

//get all posts from a specific user
router.get('/user/:user_id', (req, res) => {
	Post.find({userId: req.params.user_id})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ nopostsfound: "No posts found from that user."}));
});

//get specific post
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ nopostfound: "No post found with that ID."}));
});



module.exports = router;