var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/capadb')
var fs = require('fs')
var parse = require('csv-parse')
var Student = require('../models/student')

var data = fs.readFileSync('./bin/students.csv').toString()

parse(data, function (err, output) {
  output.forEach(function (student, i) {
    if (i === 0) {
      return
    }
    var s = new Student({
      name: student[0],
      draft: false,
      photoURI: student[3],
      program: student[4],
      status: student[5],
      age: student[6],
      location: student[7],
      family: student[8],
      quote: student[9],
      summary: student[10],
      videoURI: student[15].split('/').pop(),
      interview: []
    })

    s.audio = []
    var audio = student.slice(11, 13)
    audio.forEach(function (URI) {
      if (URI != '') {
        s.audio.push(URI)
      }
    })

    s.audioTaglines = []
    var audioTaglines = student.slice(13, 15)
    audioTaglines.forEach(function (tagline) {
      if (tagline != '') {
        s.audioTaglines.push(tagline)
      }
    })
    if (student[0]==='Kondwani Nyanda')
      console.log(s);    
    s.save()
  })
  console.log('Finished loading the students! YAY!')
})
