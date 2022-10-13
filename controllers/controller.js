class Controller {
  static showHome(req, res) {
    res.render('home') /// => /home => nampilin highlight course res.render('home' {data dari course})
  }

  static showCourse(req, res) {
    res.send('this is show course') // => /home/course
  }
  static addCourse(req, res) {
    res.render('addCourse')
  }
  static deployAddCourse(req, res) {
    res.send('hello')
  }
}

module.exports = Controller