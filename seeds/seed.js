const sequelize = require('../config/connection');
const { User, Wishlist, Item } = require('../models');

const userData = require('./user.json');
const wishlistData = require('./wishlist.json')
const itemData = require('./item.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Wishlist.bulkCreate(wishlistData);
  
  await Item.bulkCreate(itemData)

  process.exit(0);
};

seedDatabase();