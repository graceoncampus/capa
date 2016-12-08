var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: String,
    program: String, // diploma, mdiv
    status: String, // current, graduate, hide
    age: Number,
    location: String,
    family: String,
    quote: String,
    summary: String,
    photoURI: String,
    audio: [String],
    audioTaglines: [String],
    interview: [{
        question: String,
        answer: String
    }]
});

module.exports = mongoose.model('Student', studentSchema);