var Student = require('../models/student');

/* GET home page. */
module.exports.getHome = function(req, res) {
  Student.find({}, function(err, students) {
    res.render('index.ejs', {
      title: 'home',
      students: students
    });
  });
};

/* GET profile page. */
module.exports.getProfile = function(req, res) {
  Student.findOne({ _id: req.params.sid }, function(err, student) {
    res.render('profile', {
      title: 'profile',
      student: student
    });
  });
};

/* GET about page. */
module.exports.getAbout = function(req, res) {
  res.render('about', {
    title: 'about'
  });
};

/* GET needs page. */
module.exports.getNeeds = function(req, res) {
  res.render('needs', {
    title: 'needs'
  });
};