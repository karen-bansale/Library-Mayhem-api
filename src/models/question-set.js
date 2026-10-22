module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'QuestionSet',
    {
      set_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      host_id: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { tableName: 'question_sets', timestamps: true, createdAt: 'created_at', updatedAt: false }
  );
};