const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load models
const User = require('./user')(sequelize, DataTypes);
const QuestionSet = require('./question-set')(sequelize, DataTypes);

// Associations (Relasyon ng mga tables ayon sa ERD)
User.hasMany(QuestionSet, { foreignKey: 'host_id' });
QuestionSet.belongsTo(User, { foreignKey: 'host_id', as: 'host' });

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  User,
  QuestionSet,
};