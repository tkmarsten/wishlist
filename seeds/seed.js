const sequelize = require('../config/connection');
const { User, Item } = require('../models');

const userData = require('./user.json');
const itemData = require('./item.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const item of itemData) {
    await Item.create({
      ...item,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();