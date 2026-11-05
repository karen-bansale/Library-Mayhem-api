module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'QuestionSet',
    {
      set_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      host_id: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING(150), allowNull: false },
      subject: { type: DataTypes.STRING(60) },
      is_public: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      title: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.STRING(255) },
    },
    { tableName: 'question_sets', timestamps: true, createdAt: 'created_at', updatedAt: false }
  );