const { Router } = require("express");
const auth = require("./../../middelware/auth");
const Blogpost = require("../../models/Blogpost");

const blogpostRouter = new Router();

blogpostRouter.get("/", async (req, res) => {
    try {
        const blogpostsData = await Blogpost.findAll({
            include: [{ model: User }],
          });
        res.status(200).json(blogpostsData)
    } catch (error){
        res.status(400).json(error);
    }
});

blogpostRouter.post("/", auth, async (req, res) => {
  const { title, post } = req.body;

  const blogpost = await Blogpost.create({
    title: title,
    post: post,
    userId: req.user.id,
  });

  res.json({
    id: blogpost.id,
  });
});

blogpostRouter.get("/blogpost/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });

    const blogpost = blogpostData.get({ plain: true });

    res.render("blogpost", {
      ...blogpost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = blogpostRouter;
