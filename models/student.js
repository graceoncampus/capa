var mongoose = require('mongoose')

var studentSchema = mongoose.Schema({
  name: String,
  program: String, // diploma, mdiv
  status: String, // current, graduate, hide
  draft: Boolean,
  age: Number,
  location: String,
  family: String,
  quote: String,
  summary: String,
  photoURI: String,
  videoURI: String,
  audio: [String],
  audioTaglines: [String],
  interview: [{
    year: Number,
    qa: [{
      question: String,
      answer: String
    }]
  }]
})

module.exports = mongoose.model('Student', studentSchema)
