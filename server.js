const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//authentication software
const passport = require('passport');

//Bring in the routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB. Returns a promise.
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport config
require('./config/passpport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
//Port choices
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
