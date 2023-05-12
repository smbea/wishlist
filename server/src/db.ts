import { Sequelize } from 'sequelize-typescript';
import { User } from './models/User';
import { Item } from './models/Item';

let sequelize;

export const connectToDb = async (): Promise<Sequelize> => {
  sequelize = new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: 'postgres',
    models: [ User, Item ]
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await User.sync();
    const users = await User.findAll();

    if (users.length === 0) { await User.create({ username: 'user', password: 'user' }); }

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  connectToDb
};
