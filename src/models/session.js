module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'GameSession',
    {
      session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      session_code: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true,
      },
      host_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      set_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'LOBBY',
      },
      shift_timer_seconds: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 300,
      },
      chaos_meter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      started_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ended_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'game_sessions',
      timestamps: false,
    }
  );