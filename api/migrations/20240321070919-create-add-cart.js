'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cart', 'purchase_status', {
        allowNull: false,
        type: Sequelize.STRING,
        after: 'product_count'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cart', 'purchase_status');
  }
};