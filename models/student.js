var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: String,
    program: String, // diploma, mdiv
    age: Number,
    hometown: String,
    family: String,
    quote: String,
    summary: String,
    photoURI: String,
    interview: [{
        question: String,
        answer: String
    }]
});

module.exports = mongoose.model('Student', studentSchema);