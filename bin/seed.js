var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capadb');
var Student = require('../models/student');

for (var i = 0; i < 2; i++) {
  var s = new Student({
    name: 'Chris mdi',
    program: 'mdiv', // 0 is Advanced Diploma, 1 is MDiv
    age: 30,
    hometown: 'Oakland, CA',
    family: 'Wife and 2 kids',
    quote: 'im supah bent',
    summary: 'UCLA GOC shepherd',
    photoURI: '/images/chris.jpg',
    interview: [
      {
        question: 'who r u',
        answer: 'i am the chris'
      }, {
        question: 'why chris',
        answer: 'idk'
      }
    ]
  });
  console.log(s);
  s.save();
}
for (var i = 0; i < 2; i++) {
  var s = new Student({
    name: 'Chris dip',
    program: 'diploma', // 0 is Advanced Diploma, 1 is MDiv
    age: 30,
    hometown: 'Oakland, CA',
    family: 'Wife and 2 kids',
    quote: 'im supah bent',
    summary: 'UCLA GOC shepherd',
    photoURI: '/images/chris.jpg',
    interview: [
      {
        question: 'who r u',
        answer: 'i am the chris'
      }, {
        question: 'why chris',
        answer: 'idk'
      }
    ]
  });
  console.log(s);
  s.save();
}
console.log('done');