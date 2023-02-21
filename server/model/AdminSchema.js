const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    }
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
