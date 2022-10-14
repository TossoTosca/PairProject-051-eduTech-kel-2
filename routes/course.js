const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', Controller.showCourse)

routes.get('/add/', Controller.addCourse)

routes.post('/add/', Controller.deployAddCourse)

/// yang dibawah ini tambahan routes
routes.get('/home', Controller.showHome) 

routes.get('/:courseId/get/:userId/', Controller.addUserCourse)

routes.get('/:courseId/delete/', Controller.deleteCourse)

routes.get('/:courseId/edit/', Controller.editCourse)

routes.post('/:courseId/edit/', Controller.deployEditCourse)


module.exports = routes