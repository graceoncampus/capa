var Student = require('../models/student')
var uriTemplate = require('uritemplate')

/* GET about page. */
module.exports.getAbout = function (req, res) {
  res.render('about', {
    title: 'About CAPA'
  })
}

/* GET home page. */
module.exports.getStudents = function (req, res) {
  Student.find({ $query: { draft: false }, $orderby: { name: 1 } }, function (err, students) {
    if (err || students == null) {
      res.redirect('/')
      return
    }
    res.render('students.ejs', {
      title: 'CAPA Students',
      students: students
    })
  })
}

/* GET profile page. */
module.exports.getProfile = function (req, res) {
  Student.findOne({ name: req.params.name }, function (err, student) {
    if (err || student == null) {
      res.redirect('/students')
      return
    }
    var template = uriTemplate.parse('{?query*}')
    var uri = template.expand({query: {recurring: 1, months: 1, recipient: 'CAPA', comments: student.name}})
    res.render('profile', {
      title: 'CAPA: ' + student.name,
      student: student,
      uri: uri
    })
  })
}

/* GET needs page. */
module.exports.getNeeds = function (req, res) {
  res.render('needs', {
    title: 'CAPA\'s Needs'
  })
}

/* GET read page. */
module.exports.getRead = function (req, res) {
  res.render('read', {
    title: 'Get Involved With CAPA'
  })
}

/* GET newsletters page. */
module.exports.getNewsletters = function (req, res) {
  res.render('newsletters', {
    title: 'CAPA Newsletters'
  })
}

module.exports.getAdmin = function (req, res) {
  Student.find().sort({date: 1}).exec(function (err, students) {
    if (err || students == null) {
      res.redirect('/')
      return
    }
    res.render('admin', {
      title: 'Admin',
      students: students.reverse()
    })
  })
}
module.exports.getPreview = function (req, res) {
  Student.findOne({ name: req.params.name }, function (err, student) {
    if (err || student == null) {
      res.redirect('/students')
      return
    }
    var template = uriTemplate.parse('{?query*}')
    var uri = template.expand({query: {recurring: 1, months: 1, recipient: 'CAPA', comments: student.name}})
    res.render('studentPreview', {
      title: 'CAPA: ' + student.name,
      student: student,
      uri: uri
    })
  })
}

module.exports.getLogin = function (req, res) {
  res.render('login', {
    title: 'Login'
  })
}

module.exports.getRegister = function (req, res) {
  res.render('register', {
    title: 'Register'
  })
}

module.exports.getNewStudent = function (req, res) {
  res.render('newStudent', {
    title: 'New Student'
  })
}

module.exports.getEditStudent = function (req, res) {
  Student.findOne({ name: req.query.q }, function (err, student) {
    if (err || student == null) {
      res.redirect('/students')
      return
    }
    var template = uriTemplate.parse('{?query*}')
    var uri = template.expand({query: {recurring: 1, months: 1, recipient: 'CAPA', comments: student.name}})
    res.render('editStudent', {
      title: 'Edit Student',
      student: student,
      uri: uri
    })
  })
}
