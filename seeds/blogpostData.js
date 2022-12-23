const { Blogpost } = require('../models');

const blogpostData = [
  {
    id: 1,
    title: 'Article 1',
    post: 'Text for the article 1',
    posted_date: '2022-10-11 08:00:00',
    user_id: 1
  },
  {
    id: 2,
    title: 'Article 2',
    post: 'Text for the article 2',
    posted_date: '2022-11-17 06:00:00',
    user_id: 2
  },
  {
    id: 3,
    title: 'Article 3',
    post: 'Text for the article 3',
    posted_date: '2022-12-15 09:00:00',
    user_id: 1
  },
  {
    id: 4,
    title: 'Article 4',
    post: 'Text for the article 4',
    posted_date: '2022-12-14 08:00:00',
    user_id: 3
  },
];

const seedBlogpost = () => Blogpost.bulkCreate(blogpostData);

module.exports = seedBlogpost;
