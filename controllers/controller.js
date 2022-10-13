const {Course} = require('../models/index')
const {User} = require('../models/index')
const {UserCourse} = require('../models/index')
const {Profile} = require('../models/index')
const convertHMS = require('../helpers/convertMHS')
const user = require('../models/user')

class Controller {
  static showHome(req, res) {
    // res.render('home', {data})
    res.send('hello')
  }

  static showCourse(req, res) {
    // console.log(req.session.userRole, '>>>>>>>>>>>>>>>>')
    const role = req.session.userRole
    const id = req.session.userId
    console.log(role)
    Course.findAll()
    .then((result) => {
      res.render('course', {result,  convertHMS, role, id})
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

  static addUserCourse(req, res) {
    const userIds = req.params.userId
    const courseIds = req.params.courseId
    UserCourse.create({
      userId: userIds,
      courseId: courseIds
    })
    .then((result) => {
      res.redirect('/course')
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static getUser(req, res) {
    Course.findAll({
      where: {
        id : 1
      }
    })
    .then((result) => {
      
      res.render('user', {result, convertHMS})
    })
    .catch((err) => {
      res.send(err)
    })
  }
  
  static getUserCourse(req, res) {
    const id = req.params.courseId
    Course.findByPk(id)
    .then((result) => {
      console.log(result)
      console.log(id)
      res.render('courseDetail', {result, convertHMS})
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static deleteCourse(req, res) {
    const id = req.params.courseId
    console.log(id)
    Course.findByPk(id)
    .then((result)=> {
      return Course.destroy({
        where: {
          id: id
        }
      })
    })
    .then ((result) => {
      res.redirect('/course/')
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static editCourse(req, res) {
    const id = req.params.courseId
    Course.findByPk(id)
    .then((result) => {
      res.render('editCourse', {result})
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static deployEditCourse(req, res) {
    const id = req.params.courseId
    const {courseName, courseDuration, courseDescription, courseSubject} = req.body
    Course.update({
      name: courseName,
      duration: courseDuration,
      description: courseDescription,
      subject: courseSubject
    },{where:{
      id: id
    }})
    .then((result) => {
      res.redirect('/course')
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static getProfile(req, res) {
    const id = req.session.userId

    User.findAll({
      where: {
        id: id
      }, include : Profile
    })
    .then((result) => {
      res.render('profile', {result} )
      // res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
  }
}

module.exports = Controller