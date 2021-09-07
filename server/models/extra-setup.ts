export const applyExtraSetup = (db: any) => {
    const { users, products, categories, reviews } = db;
    users.hasMany(products, { as: 'author', foreignKey: 'userId', onDelete: 'cascade' });
    products.belongsTo(users, { as: 'author', foreignKey: 'userId', onDelete: 'cascade' });

    categories.hasMany(products, { as: 'category', foreignKey: 'catId' });
    products.belongsTo(categories, { as: 'category', foreignKey: 'catId' });

    reviews.hasMany(products, { as: 'product', foreignKey: 'prodId', onDelete: 'cascade' });
    products.belongsTo(reviews, { as: 'product', foreignKey: 'prodId', onDelete: 'cascade' });

    products.hasMany(reviews, { as: 'reviews', foreignKey: 'prodId', onDelete: 'cascade' });
    reviews.belongsTo(products, { as: 'reviews', foreignKey: 'prodId', onDelete: 'cascade' });

    users.hasMany(reviews, { as: 'prodUser', foreignKey: 'prodUserId', onDelete: 'SET NULL' });
    reviews.belongsTo(users, { as: 'prodUser', foreignKey: 'prodUserId', onDelete: 'SET NULL' });

    // users.hasMany(reviews, { as: 'ownerUser', foreignKey: 'ownerUserId', onDelete: 'cascade' });
    // reviews.belongsTo(users, { as: 'ownerUser', foreignKey: 'ownerUserId', onDelete: 'cascade' });


}