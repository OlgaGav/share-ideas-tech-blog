const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

User.hasMany(Blogpost, {
  foreignKey: 'user_id',
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id',
});

Blogpost.hasMany(Comment, {
  foreignKey: 'comment_id',
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'comment_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blogpost, Comment };
