'use strict';
models.exports = (sequelize, DataTypes) => {
  const purchase_history = sequelize.define('purchase_history', {
    user_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    purchased_at: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  });
  purchase_history.associate = function(models) {
    purchase_history.belongsTo(models.mst_user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'mst_user',
    });
    purchase_history.belongsTo(models.cart, {
      foreignKey: 'cart_id',
      targetKey: 'id',
      as: 'cart',
    });
  };
  return purchase_history;
};