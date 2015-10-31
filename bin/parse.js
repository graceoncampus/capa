var fs = require('fs');
var parse = require('csv-parse');
var Student = require('../models/student');

var data = fs.readFileSync('test.csv').toString();
parse(data, function (err, output) {
    output.forEach(function (student) {
        var s = new Student ({
            name: student[0],
            program: student[1],
            age: student[2],
            hometown: student[3],
            family: student[4],
            quote: student[5],
            summary: student[6]
        });
        s.interview = [];
        var subarray = student.slice(7);
        for (var i = 0; i < subarray.length - 1; i += 2) {
            s.interview.append({question: subarray[i], answer: subarray[i+1]});
        }
        console.log(s);
        s.save();
    });
    console.log('Finished loading the students!');
});
