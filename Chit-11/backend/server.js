const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User');

const app = express();

app.use(cors());

app.use(express.json());

// MongoDB Connection

mongoose.connect('mongodb://127.0.0.1:27017/wadDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Display Users

app.get('/users', async (req, res) => {

    const users = await User.find();

    res.json(users);

});

// Insert User

app.post('/add', async (req, res) => {

    const newUser = new User({

        name: req.body.name,

        email: req.body.email

    });

    await newUser.save();

    res.json(newUser);

});

// Delete User

app.delete('/delete/:id', async (req, res) => {

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User Deleted" });

});

// Server

app.listen(5000, () => {

    console.log('Server running on port 5000');

});