var student = require('../models/student');
/* GET home page. */
module.exports.getHome = function(req, res) {
  res.render('index', { title: 'CAPA' });
};

/* GET profile page. */
module.exports.getProfile = function(req, res) {
  res.render('profile', { title: 'Profile' });
};
