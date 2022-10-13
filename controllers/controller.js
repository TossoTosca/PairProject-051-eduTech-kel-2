class Controller {
  static showHome(req, res) {
    res.render('home')
  }

  static showCourse(req, res) {
    Course.findAll()
    .then((result) => {
      res.render('course', {result,  convertHMS})
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
      // res.redirect('/course/')
      return Course.findAll({
        where: {
          name: courseName
        }
      })
    })
    .then((result) => {
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