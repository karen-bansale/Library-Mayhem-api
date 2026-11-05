'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      { 
        school_id: '2099-0010', 
        username: 'bencastro2',   
        full_name: 'Ben Castro',
        email: 'ben.castro2@librarymayhem.test', 
        password_hash: 'hashedpassword',
        role: 'HOST',
        created_at: new Date() 
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { school_id: '2099-0010' }, {});
  },
};