'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0003',
        username: 'bencastro',
        full_name: 'Ben Castro',
        email: 'ben.castro@librarymayhem.test',
        password_hash: '$2b$10$placeholderhashforseeders12345', 
        role: 'HOST'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { school_id: '2099-0003' }, {});
  },
};