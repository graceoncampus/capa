var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var multer = require('multer')
var compression = require('compression')

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images/students') // set the destination
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname) // set the file name and extension
  }
})
var upload = multer({storage: storage})

mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/capadb')
var routes = require('./routes/routes')
var Student = require('./models/student')

var app = express()
app.use(compression())
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('express-session')({
  secret: 'e1fca25dd152f6c85de7351776f8d7c2324105163e5fb598',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', routes.getAbout)
app.get('/students', routes.getStudents)
app.get('/students/:name', routes.getProfile)
app.get('/needs', routes.getNeeds)
app.get('/newsletters', routes.getNewsletters)
app.get('/readpapers', routes.getRead)
app.get('/admin', requireLogin, routes.getAdmin)
app.get('/preview/:name', requireLogin, routes.getPreview)
app.get('/new', requireLogin, routes.getNewStudent)
app.get('/update', requireLogin, routes.getEditStudent)
app.get('/register', routes.getRegister)
var Account = require('./models/account')
passport.use(new LocalStrategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())
app.post('/register', function (req, res) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
    if (err) {
      return res.render('register', { account: account })
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/admin')
    })
  })
})
app.post('/new', upload.single('imagename'), function (req, res, next) {
  var s = new Student(req.body)
  s.save()
  res.send(req.body)
  res.status(200)
})
app.post('/update', upload.single('imagename'), function (req, res, next) {
  var body = req.body
  body.program = req.body.program[0]
  console.log(req.body)
  Student.update({ '_id': body.id }, { $set: body }, function (err, numberAffected, raw) {
    console.log(raw)
    console.log(numberAffected)
    console.log(err)
  })
  res.send(req.body)
  res.status(200)
})
app.get('/login', routes.getLogin)

app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/admin')
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

function requireLogin (req, res, next) {
  if (req.user) {
    next() // allow the next route to run
  } else {
    // require the user to log in
    res.redirect('/login') // or render a form, etc.
  }
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
