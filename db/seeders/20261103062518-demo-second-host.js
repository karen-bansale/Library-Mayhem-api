module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      { 
        school_id: '2099-0004', 
        username: 'bencastro',
        full_name: 'Ben Castro',
        email: 'ben.castro@aklatarena.test', 
        password_hash: '$2b$10$placeholderhashforbencastrotestaccount12345', 
        role: 'HOST',
        created_at: new Date() 
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { school_id: '2099-0004' }, {});
  },
};