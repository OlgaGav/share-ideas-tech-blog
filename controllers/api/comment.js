const { Router } = require('express');

const auth = require('./../../middelware/auth');
const Comment = require('../../models/Comment');

const commentRouter = new Router();

commentRouter.get('/', async (req, res) => {
  const { blogpost_id, content } = req.body;

  const comment = await Comment.findAll(
    { where: {
      blogpost_id,
      }
    },
    {
      include: [
        {
          model: Post,
          // attributes: []
        }
      ]
    }
  );

  res.json({
      id: comment.id,
  });
});

commentRouter.post('/', auth, async (req, res) => {
    const { title, post } = req.body;

    const comment = await Comment.create({
        title: title,
        post: post,
        userId: req.user.id,
    });

    res.json({
        id: comment.id,
    });
});


module.exports = commentRouter;