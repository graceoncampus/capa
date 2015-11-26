var Student = require('../models/student');
var uriTemplate = require('uritemplate');

/* GET home page. */
module.exports.getHome = function(req, res) {
  Student.find({ $query: {}, $orderby: { name : 1 } }, function(err, students) {
    res.render('index.ejs', {
      title: 'CAPA',
      students: students
    });
  });
};

/* GET profile page. */
module.exports.getProfile = function(req, res) {
  Student.findOne({ _id: req.params.sid }, function(err, student) {
    var template = uriTemplate.parse('{?query*}');
    var uri = template.expand({query: {recurring: 1, months: 1, recipient: 'CAPA', comments: student.name}});
    res.render('profile', {
      title: student.name,
      student: student,
      uri: uri
    });
  });
};

/* GET about page. */
module.exports.getAbout = function(req, res) {
  res.render('about', {
    title: 'About CAPA'
  });
};

/* GET needs page. */
module.exports.getNeeds = function(req, res) {
  res.render('needs', {
    title: 'Our Needs'
  });
};
