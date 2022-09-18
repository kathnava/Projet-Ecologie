'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      models.Like.belongsTo(models.User,{
        as: 'User', foreignkey: 'userId'
      })
      models.Like.belongsTo(models.Post,{
        as: 'Post', foreignkey: 'postId'
      })
       models.User.belongsToMany(models.Post, {
       through: models.Like,
        foreignKey: 'userId',
        otherkey: 'postId'
      });

      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'postId',
        otherkey: 'userId'
      });
     

    }
  }
  Like.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};