const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //allow postman
const passport = require('passport');
const path = require('path');

//routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const imageUploads = require('./routes/api/image_uploads');

//Models
const User = require('./models/User');
const Post = require('./models/Post');

const port = process.env.PORT || 5000;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

//respond to JSON requests, urlencoded, will respond to requests from postman as well
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use('/api/image-upload', imageUploads);
app.use('/api/users', users);
app.use('/api/posts', posts);

// production process.env.PORT provided by heroku

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	})
}

//starting a socket and lstening for connections
app.listen(port, () => console.log(`Server is running on port ${port}`));

