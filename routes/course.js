const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', Controller.showCourse)

routes.get('/add/', Controller.addCourse)

routes.post('/add/', Controller.deployAddCourse)

/// yang dibawah ini tambahan routes
routes.get('/home', Controller.showHome) 


module.exports = routes