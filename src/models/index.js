const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const User = require('./user')(sequelize, DataTypes);
const QuestionSet = require('./question-set')(sequelize, DataTypes);
const Question = require('./question')(sequelize, DataTypes);
const Choice = require('./choice')(sequelize, DataTypes);
const GameSession = require('./game-session')(sequelize, DataTypes);
const Player = require('./player')(sequelize, DataTypes);
const Answer = require('./answer')(sequelize, DataTypes);


User.hasMany(QuestionSet, { foreignKey: 'host_id' });
QuestionSet.belongsTo(User, { foreignKey: 'host_id', as: 'host' });

QuestionSet.hasMany(Question, { foreignKey: 'set_id' });
Question.belongsTo(QuestionSet, { foreignKey: 'set_id' });

Question.hasMany(Choice, { foreignKey: 'question_id' });
Choice.belongsTo(Question, { foreignKey: 'question_id' });

QuestionSet.hasMany(GameSession, { foreignKey: 'set_id' });
GameSession.belongsTo(QuestionSet, { foreignKey: 'set_id' });

GameSession.hasMany(Player, { foreignKey: 'session_id' });
Player.belongsTo(GameSession, { foreignKey: 'session_id' });

User.hasMany(Player, { foreignKey: 'user_id' });
Player.belongsTo(User, { foreignKey: 'user_id' });

Player.hasMany(Answer, { foreignKey: 'player_id' });
Answer.belongsTo(Player, { foreignKey: 'player_id' });

Question.hasMany(Answer, { foreignKey: 'question_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });


module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  User,
  QuestionSet,
  Question,
  Choice,
  GameSession,
  Player,
  Answer,
};