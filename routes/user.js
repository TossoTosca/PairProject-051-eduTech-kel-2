const routes = require('express').Router()

routes.get('/', (req, res) => {
res.render('user')
})

module.exports = routes