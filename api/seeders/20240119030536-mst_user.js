'use strict';

const data = [{
  id: '1',
  user_name: 's.okamoto@internous.co.jp',
  password: 'kari01pass',
  family_name: '岡本',
  first_name: '咲帆',
  post_code: '1060032',
  prefecture: '東京都',
   municipalities: '港区六本木',
   street_address: '1丁目9-9',
   apartment: '六本木ファーストビル17F'
}]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach((each) => {
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('mst_user', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mst_user', null, {});
  }
};
