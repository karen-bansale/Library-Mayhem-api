const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
const QuestionSet = require('./question-set')(sequelize, DataTypes);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Week 11: load your models here, one line each, then add their associations.
// Example:
const User = require('./user')(sequelize, DataTypes);
const QuestionSet = require('./question-set')(sequelize, DataTypes);

User.hasMany(QuestionSet, { foreignKey: 'host_id' });
QuestionSet.belongsTo(User, { foreignKey: 'host_id', as: 'host' });
//   const Player = require('./player')(sequelize, DataTypes);
//   User.hasMany(Player, { foreignKey: 'user_id' });
//   Player.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { 
  sequelize, 
  Sequelize, 
  DataTypes, 
  User, 
  QuestionSet 
};
