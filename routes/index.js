const routes = require('express').Router()
const { User } = require('../models/index')
const bcrypt = require('bcryptjs')

const courseRoute = require('./course')
const userRoute = require('./user')

// const Controller = require('../controllers/controller')

routes.get('/', (req, res) => {
    res.render('landingPage')
})
    
routes.get('/login', (req, res) => {
    const { error } = req.query;
    res.render("login", { error })
})
routes.post('/login', (req, res) => {
    const { username, password} = req.body;
    User.findOne({
      where : {
        username : username
      }
    })
    .then((user) => {
        console.log(user)
      if (user) {
        // res.redirect('/home')
        const isValidated = bcrypt.compareSync(password, user.password);
        if (isValidated) {
          req.session.userId = user.id;
          req.session.username = user.username;
          req.session.userRole = user.role;
          return res.redirect("/home");
        }
        else {
          const errors = "Invalid username or password!";
          return res.redirect(`/login?error=${errors}`);
        }
    }
    else {
        const errors = "No Username In Our Database!";
        return res.redirect(`/login?error=${errors}`);
      }
    })
    .catch(err => {
      const errors = err.errors;
      res.redirect(`/login?error=${errors}`)
    });
})

routes.get("/register", (req, res) => {
    const { error } = req.query;
    res.render("register", { error })
  });
routes.post("/register", (req, res) => {
    const { username, password, role } = req.body;
    User.create({
      username ,
      password,
      role
    },{returning:true})
    .then((result) => {
      console.log(result)
      res.redirect("/");
    })
    .catch((err) => {
        let error = err.errors;
        return res.redirect(`/register?error=${error}`);
    });
  });


routes.use((req, res, next) => {
    // console.log(req.session)
    if (!req.session.userId) {
      const error = 'Please login first!';
      res.redirect(`/login?error=${error}`);
    }
    else {
      next();
    }
})


routes.get('/home', (req, res) =>{
    res.render(`home`)
})



routes.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) {
          res.send(err)
        }
        else {
          res.redirect("/");
        }
      })
})

routes.use('/course', courseRoute)
routes.use('/user', userRoute)


module.exports = routes;