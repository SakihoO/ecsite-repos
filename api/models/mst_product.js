'use strict';
module.exports = (sequelize, DataTypes) => {
    const mst_product = sequelize.define('mst_product', {
        product_name: DataTypes.STRING,
        product_size: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        img_full_path: DataTypes.STRING,
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: false,
    });
    mst_product.associate = function(models) {
        mst_product.belongsTo(models.mst_category, {
            foreignKey: 'user_id',
            targetKey: 'id',
            as: 'mst_category'
        });
        mst_product.hasMany(models.cart, {
            foreignKey: 'product_id',
            as: 'cart'
        });
    };
    return mst_product;
};