const { User } = require('../models');

const userData = [
  {
    id: 1,
    username: 'Ana Smith',
    email: 'smith@test.com',
    password: 'password',
  },
  {
    id: 2,
    username: 'Bob Brown',
    email: 'brown@test.com',
    password: 'password',
  },
  {
    id: 3,
    username: 'John Cornell',
    email: 'john@test.com',
    password: 'password',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
