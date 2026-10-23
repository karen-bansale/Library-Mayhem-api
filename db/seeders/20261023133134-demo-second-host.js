module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      { 
        school_id: '2099-9999', 
        username: 'bencastro2', 
        full_name: 'Ben Castro',
        email: 'ben.castro@librarymayhem.test', 
        password_hash: 'ben.castro2@librarymayhem.test5', 
        role: 'HOST', 
        created_at: new Date() 
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { school_id: '2099-0005' }, {});
  },
};