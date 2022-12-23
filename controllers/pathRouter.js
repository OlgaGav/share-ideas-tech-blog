const { Router } = require ("express");
const auth = require('./../middelware/auth');
const { Blogpost, User } = require('../models');
const pathRouter = new Router();

pathRouter.get("/", async (req, res) => {
  res.render('home');

});

pathRouter.get("/login", async (req, res) => {
  res.render("login");
});

pathRouter.get("/signup", async (req, res) => {
  res.render("signup");
});


pathRouter.get('/dashboard', auth, async (req, res) => {
  try {
    // Get all blogposts and JOIN with user data
    const blogpostsData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogposts = blogpostsData.map((blogpost) => blogpost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      blogposts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});












pathRouter.get('/blogpost/:id', async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    const blogpost = blogpostData.get({ plain: true });

    res.render('blogpost', {
      ...blogpost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log("========= failed in pathRouter.get('/blogpost/:id... ==============");
    res.status(500).json(err);
  }
});


pathRouter.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});
module.exports = pathRouter;
