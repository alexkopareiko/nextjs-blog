export const applyExtraSetup = (db: any) => {
    const { users, products, categories, reviews } = db;
    users.hasMany(products, { as: 'author', foreignKey: 'userId', onDelete: 'cascade' });
    products.belongsTo(users, { as: 'author', foreignKey: 'userId', onDelete: 'cascade' });

    categories.hasMany(products, { as: 'category', foreignKey: 'catId' });
    products.belongsTo(categories, { as: 'category', foreignKey: 'catId' });

    reviews.hasMany(products, { as: 'reviews', foreignKey: 'prodId', onDelete: 'cascade' });
    products.belongsTo(reviews, { as: 'reviews', foreignKey: 'prodId', onDelete: 'cascade' });

}