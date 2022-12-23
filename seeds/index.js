const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedBlogpost = require('./blogpostData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBlogpost();

  process.exit(0);
};

seedAll();
