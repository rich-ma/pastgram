const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validatePostInput = require('../../validation/newPost');

router.get('/test', (req, res) => {
	return res.json({msg: 'This is the posts route'});
});

router.post('/', passport.authenticate('jwt', {session: false}), 
(req, res) => {
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

//get specific post and user
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			User.findById(post.userId + '')
				.then(user => {

					return res.json({post, user});
				});
		})
		.catch(err => res.status(404).json({ nopostfound: "No post found with that ID."}));
});


//toggle likes
router.post('/like/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if(
					post.likes.filter(like => like.user.toString() === req.userId)
						.length > 0
				) {
					return res
						.status(400)
						.json({ alreadyliked: 'User already liked this post' });
				}

				// Add user id to likes array
				post.likes.unshift({ user: req.userId });

				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.userId)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.userId);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });

module.exports = router;