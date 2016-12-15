var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capadb');
var fs = require('fs');
var parse = require('csv-parse');
var Student = require('../models/student');

var data = fs.readFileSync('students.csv').toString();

parse(data, function (err, output) {
    output.forEach(function (student, i) {
        if (i === 0 || student[5] && student[5] === "Hide") {
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
            summary: student[10],
            videoURI: student[15].split('/').pop(),
            interview: []
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

        s.save();
    });
    console.log('Finished loading the students! YAY!');
});

function parseInterview(year) {
    var data = fs.readFileSync(year.toString() + '.csv').toString();
    parse(data, function (err, output) {
        output.forEach(function(interview, i) {
            if (i === 0 || interview && interview[1] === "") {
                return;
            }

            Student.findOne({name: interview[0]}, function(err, s) {
                if (err || !s) {
                    return;
                }
                var interviewObj = {
                    year: year,
                    qa: []
                };
                for (var j = 2; j < interview.length; j += 2) {
                    if (interview[j - 1] != "" && interview[j] != "") {
                        interviewObj.qa.push({
                            question: interview[j-1],
                            answer: interview[j]
                        });
                    }
                }
                s.interview.push(interviewObj);
                s.save();
            });
        });
        console.log('Finished loading the students! YAY!');
    });
}

parseInterview(2015);
parseInterview(2016);