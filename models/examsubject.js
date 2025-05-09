'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamSubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExamSubject.init({
    subjectId: DataTypes.STRING,
    examId: DataTypes.STRING,
    examUrl: DataTypes.STRING,
    templateId: DataTypes.STRING,
    customerId: DataTypes.STRING,
    examLocale: DataTypes.STRING,
    examQueued: DataTypes.DATE,
    examStatus: DataTypes.STRING,
    examStep: DataTypes.STRING,
    clientId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ExamSubject',
  });
  return ExamSubject;
};