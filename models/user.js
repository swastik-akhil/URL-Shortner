const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    url: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'URL'
    }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);