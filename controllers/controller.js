const {Course} = require('../models/index')
const {User} = require('../models/index')
const {UserCourse} = require('../models/index')
const convertHMS = require('../helpers/convertMHS')

class Controller {
  static showHome(req, res) {
    res.render('home')
  }

  static showCourse(req, res) {
    // console.log(req.session.userRole, '>>>>>>>>>>>>>>>>')
    Course.findAll()
    .then((result) => {
      res.render('course', {result,  convertHMS})
    })
    .catch((err) => {
      res.send(err)
    })
  }
  static addCourse(req, res) {
    res.render('addCourse')
  }
  static deployAddCourse(req, res) {
    const {courseName, courseDuration, courseDescription, courseSubject} = req.body
    Course.create({
      name: courseName,
      duration: courseDuration,
      description: courseDescription,
      subject: courseSubject
    })
    .then((result)=>{
      res.redirect('/course/')
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static getCourse(req, res) {

  }

  static getUser(req, res) {
    res.render('user')
  }

  static getUserCourse(req, res) {
    res.render('/user/:courseId')
  }
}

module.exports = Controller