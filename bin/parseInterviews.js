var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/capadb')
var fs = require('fs')
var parse = require('csv-parse')
var Student = require('../models/student')

function parseInterview (year) {
  var data = fs.readFileSync('bin/' + year.toString() + '.csv').toString()
  parse(data, function (err, output) {
    output.forEach(function (interview, i) {
      if (i === 0) {
        return
      }
      console.log(interview[0])
      Student.findOne({name: interview[0]}, function (err, s) {
        console.log(s)
        if (err || !s) {
          return
        }
        var interviewObj = {
          year: year,
          qa: []
        }
        for (var j = 2; j < interview.length; j += 2) {
          if (interview[j - 1] != '' && interview[j] != '') {
            interviewObj.qa.push({
              question: interview[j - 1],
              answer: interview[j]
            })
          }
        }
        s.interview.push(interviewObj)
        s.save()
      })
    })
    console.log('Finished loading the interviews! YAY!')
  })
}

parseInterview(2015)
parseInterview(2016)
