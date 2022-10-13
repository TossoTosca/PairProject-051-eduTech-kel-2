const routes = require('express').Router()
module.exports = routes
const courseRoute = require('./course')
const userRoute = require('./user')
const Controller = require('../controllers/controller')


routes.get('/', Controller.showLogin)
routes.get('/add/', Controller.addUser)
routes.post('/add/', Controller.addUser)
routes.get('/home', Controller.showHome)

routes.use('/course', courseRoute)
routes.use('/user', userRoute)