'use strict';
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_count: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  });
  cart.associate = function(models) {
    cart.belongsTo(models.mst_user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'mst_user'
    });
    cart.belongsTo(models.mst_product, {
      foreignKey: 'product_id',
      targetKey: 'id',
      as: 'mst_product'
    });
    cart.hasOne(models.purchase_history, {
      foreignKey: 'cart_id',
      as: 'purchase_history'
    });
  };
  return mst_product;
};