'use strict';
const {
  Model
} = require('sequelize');
const formatPass = require('../helpers/formatPass');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.UserCourse)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please Input User Name!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password Cannot Be Empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please Select Role !"
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email Cannot Be Empty"
          }
        }
      }
    }}, {
    hooks:{
      beforeCreate(instance,option) {
        const hash = formatPass(instance.password)
        console.log(hash)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};