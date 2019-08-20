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
		.then(user => res.json(user))
		.catch(err => res.status(404).json({nouserfound: 'No user found with that ID.'}))
})

router.post('/follow/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if(user.followers.includes(req.body.currentUserId)){
				return res.status(400).json({ alreadyFollowing: 'User is already following this account'})
			} else {
				user.followers.push(req.body.currentUserId);
				user.save().then(user => res.json(user));
			}
		})
		.catch(err => res.status(404).json({ usernotfound: 'No user found'}));
})

router.post('/unfollow/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if(user.followers.includes(req.body.currentUserId)){

				const removeIndex = user.followers.indexOf(req.body.currentUserId);

				user.followers.splice(removeIndex, 1);
				user.save().then(user => res.json(user));
			} else {
				return res.status(400).json({
					alreadyFollowing: 'User is not following this account'
				})
			}
		})
		.catch(err => res.status(404).json({ usernotfound: 'No user found'}));
})

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
							const payload = {id: user.id, username: user.username, email: user.email, avatarUrl: user.avatarUrl};
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
			console.log('test', user);
			if(!user){
				return res.status(404).json({email: "This user does not exist."});
			}

			bcrypt.compare(req.body.password, user.password)
				.then(isMatch => {
					if(isMatch){
						//payload that we are sending back
						const payload = {id: user.id, username: user.username, email: user.email, avatarUrl: user.avatarUrl, name: user.name };

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

module.exports = router;