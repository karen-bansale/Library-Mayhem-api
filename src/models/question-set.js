module.exports = (sequelize, DataTypes) => {
  const QuestionSet = sequelize.define('QuestionSet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'question_sets', 
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: false
  });

  return QuestionSet;
};