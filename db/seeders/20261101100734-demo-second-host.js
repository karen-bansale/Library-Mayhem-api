module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      { 
        school_id: '2099-9999', // Palitan ito ng ibang ID
        username: 'bencastro', 
        full_name: 'Ben Castro',
        email: 'ben.castro@aklatarena.test', 
        password_hash: 'dummy_password_hash', 
        role: 'HOST' 
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { school_id: '2099-9999' }, {});
  },
};