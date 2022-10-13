const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', (req, res) => {
  res.render('course')
})

routes.get('/add/', Controller.addCourse)

routes.post('/add/', Controller.deployAddCourse)

module.exports = routes