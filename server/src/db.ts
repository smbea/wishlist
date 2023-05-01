import { Sequelize } from 'sequelize-typescript';
import { User } from './models/User';

let sequelize;

export const connectToDb = async () => {

  sequelize = new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    storage: ':memory:',
    host: '0.0.0.0',
    models: [User]
  });

  try {

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await User.sync();
    const users =  await User.findAll();

    if(users.length === 0)
      await User.create({username: "user", password: "user"});

    return sequelize;

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}