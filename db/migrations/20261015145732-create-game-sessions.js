'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_sessions', {
      session_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      session_code: {
        type: Sequelize.CHAR(6),
        allowNull: false,
        unique: true
      },
      host_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onDelete: 'CASCADE'
      },
      set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'question_sets',
          key: 'set_id'
        },
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'LOBBY'
      },
      shift_timer_seconds: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 300
      },
      chaos_meter: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      started_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      ended_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('game_sessions');
  }
};