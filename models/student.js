var mongoose = require('mongoose');

var studentSchema = mongoose.Schema ({
    name: String,
    program: String,
    age: Number,
    hometown: String,
    family: String,
    quote: String,
    summary: String,
    interview: [{
        question: String,
        answer: String
    }]
});

module.exports = mongoose.model("Student", studentSchema);