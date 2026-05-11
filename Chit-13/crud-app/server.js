const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/User');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection

mongoose.connect('mongodb://127.0.0.1:27017/crudDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// READ Operation

app.get('/', async (req, res) => {

    const users = await User.find();

    res.render('index', { users });

});

// CREATE Operation

app.post('/add', async (req, res) => {

    const newUser = new User({

        name: req.body.name,

        email: req.body.email

    });

    await newUser.save();

    res.redirect('/');

});

// UPDATE Operation

app.post('/update/:id', async (req, res) => {

    await User.findByIdAndUpdate(req.params.id, {

        name: req.body.name,

        email: req.body.email

    });

    res.redirect('/');

});

// DELETE Operation

app.get('/delete/:id', async (req, res) => {

    await User.findByIdAndDelete(req.params.id);

    res.redirect('/');

});

// Server

app.listen(3000, () => {

    console.log('Server running on port 3000');

});