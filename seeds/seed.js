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

  for (const wishlist of wishlistData) {
    await Wishlist.create({
      ...wishlist,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const item of itemData) {
    await Item.create({
      ...item,
    })
  }

  process.exit(0);
};

seedDatabase();