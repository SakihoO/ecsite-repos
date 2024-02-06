'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("mst_category", "category_sub_name", {
      allowNull: false,
      type: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("mst_category", "category_sub_name");
  }
};
