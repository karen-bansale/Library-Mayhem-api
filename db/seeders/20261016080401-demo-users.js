'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0001',
        username: 'host_admin',
        full_name: 'Alex Rivera',
        email: 'alex.rivera@library.test',
        password_hash: 'hashed_password_123',
        role: 'host',
        created_at: new Date()
      },
      {
        school_id: '2099-0002',
        username: 'player_one',
        full_name: 'Jordan Santos',
        email: 'jordan.santos@library.test',
        password_hash: 'hashed_password_123',
        role: 'player',
        created_at: new Date()
      },
      {
        school_id: '2099-0003',
        username: 'player_two',
        full_name: 'Taylor Cruz',
        email: 'taylor.cruz@library.test',
        password_hash: 'hashed_password_123',
        role: 'player',
        created_at: new Date()
      },
      {
        school_id: '2099-0004',
        username: 'player_three',
        full_name: 'Morgan Reyes',
        email: 'morgan.reyes@library.test',
        password_hash: 'hashed_password_123',
        role: 'player',
        created_at: new Date()
      },
      {
        school_id: '2099-0005',
        username: 'player_four',
        full_name: 'Casey Mendoza',
        email: 'casey.mendoza@library.test',
        password_hash: 'hashed_password_123',
        role: 'player',
        created_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};