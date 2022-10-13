const routes = require('express').Router()
const { User, Profile } = require('../models/index')
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
  const { userName, password} = req.body;
  console.log(req.body)
  User.findOne({
    where : {
      userName
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
      console.log(err)
    const errors = err.errors;
    res.redirect(`/login?error=${errors}`)
  });
})

routes.get("/register", (req, res) => {
    const { error } = req.query;
    res.render("register", { error })
  });



  routes.post("/register", (req, res) => {
    console.log(req.body)
    const { email, userName, firstName, lastName, birthDate ,password, role } = req.body;
    User.create({
        email,
        userName,
        password,
        role,
        email
    }, {
        include: Profile,
        returning: true
    }
    )
    .then((test) => {
        const UserId = test.id
        const roleProfile = test.role
        Profile.create({
            firstName,
            lastName,
            birthDate,
            role: roleProfile, // role di profile
            UserId
        })
        .then((data) =>{
            // console.log(data,"__________________________________________")
            // res.send(data)
            res.redirect('login') // tadi res send data
        })
        .catch((err) => {
            // console.log(err,":::::::::::::::::::::::::::::::::::::::::")
            res.send(err)
        })
    })
    .catch((err) => {
        // console.log(err,"+++++++++++++++++++++++++++++++++++")
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
    let userId = req.session.userId
    let username = req.session.username
    User.findOne({
        where: {
            id: userId 
        }
    })
    .then((data) => {
        // res.send(data)
        // console.log(req.session)
        // console.log(data.userName)
        res.render('home', {data: data.userName})
    })
    .catch((err) => {
        res.send(err)
    })
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