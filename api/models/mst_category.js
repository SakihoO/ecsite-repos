'use strict';
module.exports = (sequelize, DataTypes) => {
  const mst_category = sequelize.define('mst_category', {
    category_name: DataTypes.STRING,
    category_sub_name: DataTypes.STRING,
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  });
  mstCategory.associate = function(models) {
    mst_category.hasMany(models.mst_product, {
      foreignKey: 'category_id',
      as: 'mst_product'
    });
  };
  return mst_category;
};