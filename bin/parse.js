var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capadb');
var fs = require('fs');
var parse = require('csv-parse');
var Student = require('../models/student');

var data = fs.readFileSync('students.csv').toString();

parse(data, function (err, output) {
    output.forEach(function (student) {
        var s = new Student ({
            name: student[0],
            photoURI: student[1],
            program: student[2],
            age: student[3],
            location: student[4],
            family: student[5],
            quote: student[6],
            summary: student[7]
        });

        s.audio = [];
        var audio = student.slice(8, 10);
        audio.forEach(function(URI) {
            if (URI != "") {
                s.audio.push(URI);
            }
        });

        s.interview = [];
        var interview = student.slice(10);
        for (var i = 1; i < interview.length; i += 2) {
            if (interview[i-1] != "" && interview[i] != "") {
                s.interview.push({
                    question: interview[i-1],
                    answer: interview[i]
                });
            }
        }
        console.log(s);
        s.save();
    });
    console.log('Finished loading the students! YAY!');
});
