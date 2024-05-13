const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    center: { type: String, required: true }
});

const Center = mongoose.model('Center', centerSchema);

module.exports = Center;