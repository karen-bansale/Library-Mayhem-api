'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      player_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'game_sessions', key: 'session_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' }
      },
      nickname: {
        type: Sequelize.STRING(24),
        allowNull: false
      },
      joined_at: { 
        type: Sequelize.DATE,
        allowNull: true
      },
      finished_at: { 
        type: Sequelize.DATE,
        allowNull: true
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      last_seen_at: {
        type: Sequelize.DATE
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW') // Idinagdag ang comma sa itaas nito
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addConstraint('players', {
      fields: ['session_id', 'nickname'],
      type: 'unique',
      name: 'uq_player_nickname' 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};