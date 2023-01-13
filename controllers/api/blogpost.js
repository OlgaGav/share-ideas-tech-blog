const router = require('express').Router();
const { Blogpost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let dateTime = cDate + ' ' + cTime;
  try {
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
      posted_date: dateTime
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  let postData = {
    title: req.body.title,
    post: req.body.post,
  }
  try {
    const blogpostData = await Blogpost.update(postData, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    console.log(blogpostData);
    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id/comment', async(req, res) => {
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let dateTime = cDate + ' ' + cTime;

  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      blogpost_id: req.params.id,
      posted_date: dateTime
    })
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
