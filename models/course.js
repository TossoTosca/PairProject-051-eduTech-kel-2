'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.UserCourse)
    }

    static convertDuration() {
      let value = Number(this.duration);
      var h = Math.floor(value / 3600);
      var m = Math.floor(value % 3600 / 60);
      var s = Math.floor(value % 3600 % 60);
    
      var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return hDisplay + mDisplay + sDisplay; 
    }
  }
  Course.init({
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    description: DataTypes.STRING,
    subject: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};