'use strict';

const data = [{
  id: '1',
  category_name: 'ソファ・チェア'
},{
  id: '2',
  category_name: 'テーブル'
},{
  id: '3',
  category_name: '照明'
},{
  id: '4',
  category_name: 'インテリア雑貨'
}];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach((each) => {
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('mst_category', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mst_category', null, {});
  }
};
