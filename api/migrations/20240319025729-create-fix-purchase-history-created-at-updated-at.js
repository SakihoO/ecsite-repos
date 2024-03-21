'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('purchase_history', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.changeColumn('purchase_history', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('purchase_history', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });

    await queryInterface.changeColumn('purchase_history', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  }
};