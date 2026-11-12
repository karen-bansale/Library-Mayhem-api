'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('question_sets', [
      {
        host_id: 1, 
        title: 'Philippine Literature',
        subject: 'Literature',
        is_public: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('question_sets', null, {});
  }
};