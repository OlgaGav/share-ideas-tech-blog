const { Router } = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./../../middelware/auth");
const { User } = require('../../models');

const usersRouter = new Router();

usersRouter.post("/login", auth, async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: {
        email,
    }});

console.log(`========verify if user found==========`);
console.log(user);

    if (!user) {
        res.status(401).end('User not found');
        return;
    }

    if (user.password !== password) {
        res.status(401).end("Bad password");
        return;
    }

    const token = jwt.sign({ id: user.email }, process.env.JWT_KEY);
    console.log(`=====generated jwt token is ${token}===============`)
    res.cookie('logintoken',token, { httpOnly: true });


    req.session.save(() => {
      req.session.user = userData.username;
      req.session.logged_in = true;
    });

    res.status(200).json(`User "${user.email}" logged in successfully`);
});

usersRouter.post('/', async (req, res) => {
  const { username, email, password} = req.body;
  //check if this user already exist 
  const user = await User.findOne({ where: {
    email,
  }});

  if (user) {
    res.status(409).end('User with this email already exists');
    return;
  }

  try {
    const userData = await User.create({
      username,
      email,
      password,
    });
    const token = jwt.sign({ id: username }, process.env.JWT_KEY);
    res.cookie('logintoken',token, { httpOnly: true });
    req.session.save(() => {
      req.session.user = username;
      req.session.logged_in = true;
  
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

usersRouter.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = usersRouter;