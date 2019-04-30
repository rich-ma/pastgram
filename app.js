const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //allow postman

//routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

//Models
const User = require('./models/User');
const Post = require('./models/Post');


mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.get('/', (req, res) => {
	res.send("hello world");
});

//respond to JSON requests, urlencoded, will respond to requests from postman as well
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/posts', posts);

// production process.env.PORT provided by heroku
const port = process.env.PORT || 5000;

//starting a socket and lstening for connections
app.listen(port, () => console.log(`Server is running on port ${port}`));

