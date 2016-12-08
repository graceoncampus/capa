var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capadb');
var fs = require('fs');
var parse = require('csv-parse');
var Student = require('../models/student');

var data = fs.readFileSync('students.csv').toString();

parse(data, function (err, output) {
    output.forEach(function (student) {
        if (student[5] && student[5] === "Hide") {
            return;
        }

        var s = new Student ({
            name: student[0],
            photoURI: student[3],
            program: student[4],
            status: student[5],
            age: student[6],
            location: student[7],
            family: student[8],
            quote: student[9],
            summary: student[10]
        });

        s.audio = [];
        var audio = student.slice(11, 13);
        audio.forEach(function(URI) {
            if (URI != "") {
                s.audio.push(URI);
            }
        });

        s.audioTaglines = [];
        var audioTaglines = student.slice(13, 15);
        audioTaglines.forEach(function(tagline) {
            if (tagline != "") {
                s.audioTaglines.push(tagline);
            }
        });

        s.interview = [];
        var interview = student.slice(15);
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
