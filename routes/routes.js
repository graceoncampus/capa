var Student = require('../models/student');

/* GET home page. */
module.exports.getHome = function(req, res) {
  Student.find({}, function(err, students) {
    res.render('index.ejs', {
      title: 'CAPA',
      students: students
    });
  });
};

/* GET profile page. */
module.exports.getProfile = function(req, res) {
  Student.find({ _id: req.params.sid }, function(err, student) {
    res.render('profile', {
      title: 'Profile',
      student: student
    });
  });
};
