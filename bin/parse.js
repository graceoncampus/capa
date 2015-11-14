var fs = require('fs');
var parse = require('csv-parse');
var Student = require('../models/student');

var data = fs.readFileSync('students.csv').toString();

parse(data, function (err, output) {
    output.forEach(function (student) {
        var s = new Student ({
            name: student[0],
            program: student[1],
            age: student[2],
            location: student[4],
            family: student[5],
            quote: student[6],
            summary: student[7],
            photoURI: ""
        });

        s.audio = [];
        var audio = student.slice(7, 9);
        audio.forEach(function(URI) {
            if (URI != "") {
                s.audio.push(URI);
            }
        });

        s.interview = [];
        var interview = student.slice(9);
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
