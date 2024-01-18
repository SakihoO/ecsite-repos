'use strict';
module.exports = (sequelize, DataTypes) => {
  const mst_user = sequelize.define('mst_user', {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    family_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    post_code: DataTypes.STRING,
    prefecture: DataTypes.STRING,
    municipalities: DataTypes.STRING,
    street_address: DataTypes.STRING,
    apartment: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  });
  mst_user.associate = function(models) {
    mst_user.hasOne(models.cart, {
      foreignKey: 'user_id',
      as: 'cart',
    });
    mst_user.hasOne(models.purchase_history, {
      foreignKey: 'user_id',
      as: 'purchase_history',
    });
  };
  return mst_user;
};