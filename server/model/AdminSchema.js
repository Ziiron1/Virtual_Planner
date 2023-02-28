const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    IDAdmin: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    }
});

module.exports = mongoose.model('admins', AdminSchema);
