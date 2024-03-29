const mongoose = require('mongoose');

const favour = new mongoose.Schema({
    publisher: String,
    text: String,
    award: String,
    createdAt: String,
    isAccepted: Boolean,
    isFinished: Boolean,
    receiver: String,
    picture: String,
    comments: Array,
    follower: Array,
})
module.exports = mongoose.model('Favour',favour);