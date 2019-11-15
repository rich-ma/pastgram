const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUpdateUser = require('../../validation/updateUser');

router.get('/test', (req, res) => res.json({msg: 'This is the users route'}));

//private auth route
router.get('/current', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	res.json({
		id: req.user.id,
		username: req.user.username,
		email: req.user.email,
		avatarUrl: req.user.avatarUrl,
		followers: req.user.followers,
		following: req.user.following,
		name: req.user.name,
		bio: req.user.bio
	});
})

router.get('/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			let data = {
				user: {
						username: user.username,
						avatarUrl: user.avatarUrl,
						_id: user.id,
						followers: user.followers,
						following: user.following,
						name: user.name,
						bio: user.bio
				}
			}
			return res.json(data);
		})
		.catch(err => res.status(404).json({nouserfound: 'No user found with that ID.'}))
})

router.post('/follow/:id', (req, res) => {
	User.find({_id: {$in: [req.body.userId, req.body.currentUserId]}})
		.then(users => {
			let currentUser, followUser;

			users.forEach(user => {
				if(user._id + '' === req.body.userId){
					followUser = user;
				} else {
					currentUser = user;
				}
			})

			if(followUser.followers.includes(currentUser._id + '')){
				return res.status(400).json({ alreadyFollowing: 'User is already following this account'})
			} else {
				followUser.followers.push(req.body.currentUserId);
				currentUser.following.push(req.body.userId);
				followUser.save();
				currentUser.save();
				const data = {
					currentUser, followUser
				};

				return res.json(data);
			}
		})
		.catch(err => res.status(404).json({ usernotfound: 'No user found'}));
})

router.post('/unfollow/:id', (req, res) => {
	User.find({_id: {$in: [req.body.userId, req.body.currentUserId]}})
	.then(users => {
		let currentUser, followUser;

		users.forEach(user => {
			if(user._id + '' === req.body.userId){
				followUser = user;
			} else {
				currentUser = user;
			}
		})

		if(followUser.followers.includes(req.body.currentUserId)){
			let removeIndex = followUser.followers.indexOf(req.body.currentUserId);

			followUser.followers.splice(removeIndex,1);

			removeIndex = currentUser.following.indexOf(req.body.userId);

			currentUser.following.splice(removeIndex, 1);

			currentUser.save();
			followUser.save();

			const data = {
				currentUser, followUser
			}
			return res.json(data);
		} else {
			return res.status(400).json({
				notFollowing: 'User is not following this account'
			})
		}
	})
	.catch(err => res.status(404).json({
		usernotfound: 'No user found'
	}));
});

router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if(!isValid) return res.status(400).json(errors);

	User.findOne({email: req.body.email})
	.then(user => {
		if(user){
			return res.status(400).json({email: "A User is already registered with that email"}); //user already registered with email
		} else {
			User.findOne({username: req.body.username})
			.then(user =>{
				if (user) return res.status(400).json({
					email: "A User is already registered with that username"
				}); //user already registers with username	
			});

			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				avatarUrl: "https://www.showflipper.com/blog/images/default.jpg"
			})

			//creating salted pw, running 10 times
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;

					//saving to db and then giving a token for an hour for the user
					newUser.save()
						.then((user) => {
							const payload = {id: user.id, username: user.username, email: user.email, avatarUrl: user.avatarUrl, followers: user.followers, following: user.following};
							jwt.sign(
								payload,
								keys.secretOrKey,
								// Sets key to expire in set amt of seconds.
								{expiresIn: 3600},
								(err, token) => {
									res.json({
										user: payload,
										success: true,
										token: 'Bearer ' + token
									});
								}
							);
						})
						.catch(err => console.log(err));
				})
			})
		}
	})
});

router.patch('/:id', passport.authenticate('jwt',{ session: false }), (req, res) => {
	const reqUser = req.body.user;
	const { errors, isValid } = validateUpdateUser(reqUser);	

	if(!isValid) return res.status(400).json(errors);
	
	User.findById(req.body.userId)
		.then(user => {
			
			if(user.username !== reqUser.username){ //changing username
				User.findOne({username: reqUser.username})
					.then(usernameUser => {
						if(usernameUser){ 
							return res.status(400).json({
							username: "A User is already registered with that username"
						});
						} else {
							user.username = reqUser.username;
							user.bio = reqUser.bio;
							user.name = reqUser.name;
							user.avatarUrl = reqUser.avatarUrl;
							user.save()
								.then(user => res.json(user))
								.catch(err => console.log(err));
						}
					})
			} else { //not changing username
				user.bio = reqUser.bio;
				user.name = reqUser.name;
				user.avatarUrl = reqUser.avatarUrl;
				user.save()
				.then(user => res.json(user))
				.catch(err => console.log(err));
			}
		});
});

router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if(!isValid) return res.status(400).json(errors);

	User.findOne({email: req.body.email})
		.then(user => {
			if(!user){
				return res.status(404).json({email: "This user does not exist."});
			}

			bcrypt.compare(req.body.password, user.password)
				.then(isMatch => {
					if(isMatch){
						//payload that we are sending back
						const payload = {id: user.id, username: user.username, email: user.email, avatarUrl: user.avatarUrl, name: user.name, following: user.following, followers: user.followers };

						//create a JSON webtoken
						jwt.sign(
							payload,
							keys.secretOrKey,
							// Sets key to expire in set amt of seconds. OptionsHash
							{expiresIn: 3600000},
							//callback function once we create the jwt
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
							}
						);
					} else {
						errors.password = "Incorrect password."
						return res.status(400).json(errors);
					}
				})
		})
})

// Seed followers and following for each user. 
// router.post('/seed', (req, res) => {
// 	let ids = ['5d9adc8838adb20017be4013', '5d9adc1c38adb20017be4012', '5d9add0838adb20017be4014', '5d9add2b38adb20017be4015', '5d9addc938adb20017be4016', '5d9ade1738adb20017be4017', '5d9ade3138adb20017be4018', '5d9adf5038adb20017be4019', '5d9adfbc38adb20017be401a', '5d9ae00e38adb20017be401b'];

// 	function shuffle(array) {
// 		var currentIndex = array.length,
// 			temporaryValue, randomIndex;

// 		// While there remain elements to shuffle...
// 		while (0 !== currentIndex) {

// 			// Pick a remaining element...
// 			randomIndex = Math.floor(Math.random() * currentIndex);
// 			currentIndex -= 1;

// 			// And swap it with the current element.
// 			temporaryValue = array[currentIndex];
// 			array[currentIndex] = array[randomIndex];
// 			array[randomIndex] = temporaryValue;
// 		}
// 		return array;
// 	}

// 	User.find({ '_id': { $in: ids }}, (err, users) => {
// 		users.forEach(user => {
// 			let randFollower = Math.floor(Math.random() * 3) + 5;
// 			let randFollowing = Math.floor(Math.random() * 3) + 5;
			

// 			user.following = shuffle(ids).slice(0, randFollowing);
// 			user.followers = shuffle(ids).slice(0, randFollower);
// 			user.save();
// 			console.log(user);
// 		})

// 		return res.json({complete: 'done'})
// 	});
// })

module.exports = router;