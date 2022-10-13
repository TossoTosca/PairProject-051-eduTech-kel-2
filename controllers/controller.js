class Controller {
  static showLogin(req, res) {
    res.render('login')
  }

  static addUser(req, res) {
    res.render('addUser')
  }

  static deployAddUser(req, res) {
    res.send('hello')
  }

  static showHome(req, res) {
    res.render('home')
  }

  static showCourse(req, res) {
    res.send('this is show course')
  }
  static addCourse(req, res) {
    res.render('addCourse')
  }
  static deployAddCourse(req, res) {
    res.send('hello')
  }
}

module.exports = Controller