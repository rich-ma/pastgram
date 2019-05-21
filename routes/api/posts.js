const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validatePostInput = require('../../validation/newPost');

router.get('/test', (req, res) => {
	return res.json({msg: 'This is the posts route'});
});

router.post('/', passport.authenticate('jwt', {session: false}), 
(req, res) => {
	console.log(req.body);
	const post = req.body.post;
	const user = req.body.user;

	if (post.userId === user.id) {
		const {errors, isValid} = validatePostInput(post);

		if(!isValid){
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			userId: post.userId,
			text: post.text,
			url: post.url 
		});
		newPost.save()
			.then(post => res.json(post))
			.catch(err => console.log(err));
	} else {
		return res.json({
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