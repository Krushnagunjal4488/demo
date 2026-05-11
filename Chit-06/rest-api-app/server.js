const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/User');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/wadDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Home Page
app.get('/', async (req, res) => {

    const users = await User.find();

    res.render('index', { users });
});

// Insert User
app.post('/add', async (req, res) => {

    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    await newUser.save();

    res.redirect('/');
});

// Update User
app.post('/update/:id', async (req, res) => {

    await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email
    });

    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});