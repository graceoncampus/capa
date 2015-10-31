var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: String,
    program: Number, // 0 is Advanced Diploma, 1 is MDiv
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