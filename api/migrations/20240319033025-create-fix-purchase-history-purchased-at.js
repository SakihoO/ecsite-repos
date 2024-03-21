'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('purchase_history', 'purchased_at', {
        allowNull: false,
        type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('purchase_history', 'purchased_at', {
        allowNull: false,
        ype: Sequelize.DATE,
    })
  }
};