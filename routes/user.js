const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', Controller.getUser)

routes.get('/:courseId', Controller.getUserCourse)


module.exports = routes