const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    publisher: String,
    releaseDate: Date,
});

const User = mongoose.model('User', UserSchema);