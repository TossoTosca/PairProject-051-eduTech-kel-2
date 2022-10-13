const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:true }))
app.use(session({
  secret: 'hehehe',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: true
  }
  }));

app.use('/', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})