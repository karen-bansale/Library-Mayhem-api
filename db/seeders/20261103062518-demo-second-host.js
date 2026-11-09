'use strict';

module.exports = {
  async up(queryInterface) {
    const [existingUsers] = await queryInterface.sequelize.query(
      'SELECT user_id FROM users WHERE school_id = :schoolId LIMIT 1',
      { replacements: { schoolId: '2099-0011' } }
    );

    if (existingUsers.length > 0) {
      console.log('User 2099-0011 already exists; skipping insert.');
      return;
    }

    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0011',
        username: 'bencastro0011',
        full_name: 'Ben Castro',
        email: 'ben.castro@aklataren',
        password_hash: '$2b$10$placeholderhashforbencastrotestaccount12345',
        role: 'HOST',
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'users',
      { school_id: '2099-0011' },
      {}
    );
  },
};