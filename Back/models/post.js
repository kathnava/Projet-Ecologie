'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User,{
        as: 'user', foreignkey: 'userId'
    })
    }
  }
  Post.init({
    texte: DataTypes.STRING,
    attachement: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};