'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('cart', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue:
        Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('cart', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
  }
};