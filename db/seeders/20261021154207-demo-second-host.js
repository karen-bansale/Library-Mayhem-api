'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Sinisigurong malinis o walang duplicate bago mag-insert kung sakaling ulitin ang seed
    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0007',
        username: 'ben_castro',
        full_name: 'Ben Castro',
        email: 'ben.castro@sorsu.edu.ph',
        password_hash: '$2b$10$YourHashedPasswordHere...',
        role: 'HOST',
        created_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { school_id: '2099-0007' }, {});
  },
};