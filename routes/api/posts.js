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

// router.post('/seed', (req, res) => {
// 	console.log('in seed router');
// 	//grab all existing posts, add likes randomly from 0 to 8 of the existing users
// 	//put the user id's in an array and randomly choose 0 to 8
// 	Post.find()
// 		.then(posts => {
			
// 			let ids = ['5d9adc8838adb20017be4013', '5d9adc1c38adb20017be4012', '5d9add0838adb20017be4014', '5d9add2b38adb20017be4015', '5d9addc938adb20017be4016', '5d9ade1738adb20017be4017', '5d9ade3138adb20017be4018', '5d9adf5038adb20017be4019', '5d9adfbc38adb20017be401a', '5d9ae00e38adb20017be401b'];

// 			function shuffle(array) {
// 				var currentIndex = array.length,
// 					temporaryValue, randomIndex;

// 				// While there remain elements to shuffle...
// 				while (0 !== currentIndex) {

// 					// Pick a remaining element...
// 					randomIndex = Math.floor(Math.random() * currentIndex);
// 					currentIndex -= 1;

// 					// And swap it with the current element.
// 					temporaryValue = array[currentIndex];
// 					array[currentIndex] = array[randomIndex];
// 					array[randomIndex] = temporaryValue;
// 				}

// 				return array;
// 			}

// 			posts.forEach(post => {

// 				//randomly chooses value from 4-8
// 				let num = Math.floor(Math.random() * 5) + 4;
			

// 				ids = shuffle(ids);

// 				while(num > 0){
// 					post.likes.push(ids[num]);
// 					num--;
// 				}

// 				post.save();
// 				console.log(post.likes);

// 			})

// 		})
// 	return res.json({
// 		msg: 'done'
// 	})


// })

//post new post
router.post('/new', passport.authenticate('jwt', {session: false}), 
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
//grab all posts, grab all users with posts
//might be easier to just implement with following  
router.post('/all', (req, res) => {
	let users = req.body.users;
	let postPP = 5;

	Post.find()
		.sort({date: -1})
		.then(posts => {
			let totalPosts = posts.length;
			let currentPage = req.body.currentPage;
			const newPosts = posts.slice(postPP * currentPage, postPP * (currentPage + 1));
			const totalPages = Math.ceil(posts.length / postPP);

			//grab user ids from all the posts, check redundancy O(1) time
			let userIds = [];
			newPosts.forEach(post => {
				let id = post.userId + '';
				if(users[id]){
				} else {
					userIds = userIds.concat(id);
				}
			})

			//no new users
			if(userIds.length === 0){
				const data = {
					users,
					all: {
						currentPage: currentPage + 1,
						totalPages,
						posts: newPosts,
						totalPosts
					}
				};
				return res.json(data);
			} else {
				User.find({
					'_id': {
						$in: userIds
						}}, (err, newUsers) => {
							newUsers.forEach(user => { //add any new user to users object for frontend
								if(users[user._id + '']){

								} else {
									users[user._id + ''] = {
										username: user.username,
										avatarUrl: user.avatarUrl,
										id: user._id
									}
								}
							});

							const data = {
								users,
								all: {
									currentPage: currentPage + 1,
									totalPages,
									posts: newPosts,
									totalPosts
								}
							};
							return res.json(data);
					});
			}
			})
			.catch(err => {
				res.status(404).json({ nopostsfound: "No posts found." })
			})
})

//get follower posts only
//immediately grab all users that current user is following, follow same procedures 
// this allows us to not need to find the user based on the results anymore.  
// now in our get posts, we call fetchusers, grab the users, then using those users, calling fetch posts
router.post('/', (req, res) => {
	let userIds = req.body.following;
	let usersArray = req.body.users;
	let postPP = 5;

	Post.find({userId: {$in: userIds}})
		.sort({date: -1})
		.then(posts => {
			let totalPosts = posts.length;
			let currentPage = req.body.currentPage;
			const newPosts = posts.slice(postPP * currentPage, postPP * (currentPage + 1));
			const totalPages = Math.ceil(posts.length / postPP);
			
			if(users.length !== userIds.length){
				User.find({_id: {$in: userIds}})
				.then(users => {
					const data = {
						users,
						all: {
							currentPage: currentPage + 1,
							totalPages,
							posts: newPosts,
							totalPosts
						}
					};
					return res.json(data);
				});
			} else {
				const data = {
					users,
					all: {
						currentPage: currentPage + 1,
						totalPages,
						posts: newPosts,
						totalPosts
					}
				};
				return res.json(data);
			}
		})
		.catch(err => {
			res.status(404).json({ nopostsfound: "No posts found." })
		})
});

// //get all posts from a specific user
// router.post('/user/:user_id', passport.authenticate('jwt', {
// 			session: false
// 		}), (req, res) => {
// 	let postPP = 12;
// 	Post.find({userId: req.params.user_id})
// 		.sort({date: -1})
// 		.then(posts => {
// 			let totalPosts = posts.length; 
// 			if(req.body.loaded){
// 				let currentPage = req.body.currentPage;
// 				const newPosts = posts.slice(postPP * currentPage, postPP * (currentPage + 1));
// 				const data = {
// 					profile:{
// 						currentPage: req.body.currentPage + 1,
// 						totalPages: req.body.totalPages,
// 						posts: newPosts,
// 						totalPosts
// 					}
// 				};
// 				return res.json(data);
// 			} else {
// 				const newPosts = posts.slice(0, postPP);
// 				const totalPages = Math.ceil(posts.length/postPP);
// 				const currentPage = 1;
// 				User.findById(posts[0].userId + '')
// 				.then(user => {
// 					const data = {
// 						user: {
// 							username: user.username,
// 							avatarUrl: user.avatarUrl,
// 							_id: user.id,
// 							followers: user.followers,
// 							following: user.following,
// 							name: user.name,
// 							bio: user.bio
// 						},
// 						profile: {
// 							currentPage,
// 							totalPages,
// 							posts: newPosts,
// 							totalPosts
// 						}
// 					};
// 					return res.json(data);
// 				})
// 				// .catch(err => res.status(404).json({ nouserfound: 'No user found with that id'}))
// 			}
// 		})
// 		.catch(err => res.status(404).json({
// 			nopostsfound: "No posts found from that user."
// 		}));
// });

//get all posts from a specific user
router.post('/user/:user_id', passport.authenticate('jwt', {
			session: false
		}), (req, res) => {
	let postPP = 12;
	Post.find({userId: req.params.user_id})
		.sort({date: -1})
		.then(posts => {
			let totalPosts = posts.length; 
			if(req.body.loaded){
				let currentPage = req.body.currentPage;
				const newPosts = posts.slice(postPP * currentPage, postPP * (currentPage + 1));
				const data = {
					profile:{
						currentPage: req.body.currentPage + 1,
						totalPages: req.body.totalPages,
						posts: newPosts,
						totalPosts
					}
				};
				return res.json(data);
			} else {
				const newPosts = posts.slice(0, postPP);
				const totalPages = Math.ceil(posts.length/postPP);
				const currentPage = 1;
				const data = {
					profile: {
						currentPage,
						totalPages,
						posts: newPosts,
						totalPosts
					}
				};
				return res.json(data);
				// .catch(err => res.status(404).json({ nouserfound: 'No user found with that id'}))
			}
		})
		.catch(err => res.status(404).json({
			nopostsfound: "No posts found from that user."
		}));
});

//get specific post and user
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			User.findById(post.userId + '')
				.then(user => {
					return res.json({post, user:{
						avatarUrl: user.avatarUrl,
						_id: user._id,
						username: user.username,
						followers: user.followers,
						following: user.following
					}});
				});
		})
		.catch(err => res.status(404).json({ nopostfound: "No post found with that ID."}));
});


//toggle likes
router.post('/like/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if(post.likes.includes(req.body.userId)) {
					return res
						.status(400)
						.json({ alreadyliked: 'User already liked this post' });
				} else {
					// Add user id to likes array
					post.likes.push(req.body.userId);
					post.save().then(post => res.json({
						_id: post._id,
						likes: post.likes,
						text: post.text,
						url: post.url,
						userId: post.userId,
						comments: post.comments,
						date: post.date,
						index: req.body.index
					}));
				}
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

router.post('/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.includes(req.userId)){
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          } else {
						// Get remove index
						const removeIndex = post.likes.indexOf(req.userId);

						// Splice out of array
						post.likes.splice(removeIndex, 1);

						// Save
						post.save().then(post => res.json({
								_id: post._id,
								likes: post.likes,
								text: post.text,
								url: post.url,
								userId: post.userId,
								comments: post.comments,
								date: post.date,
								index: req.body.index
						}));
					}
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });

module.exports = router;