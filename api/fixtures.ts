import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import crypto from 'crypto';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection were not present, skipping drop...');
  }

  const [admin, user] = await User.create(
    {
      email: 'admin@gmail.com',
      displayName: 'Administrator',
      password: '111',
      token: crypto.randomUUID(),
      image: 'fixtures/admin.jpeg',
      role: 'admin',
    },
    {
      email: 'user@gmail.com',
      displayName: 'Userman',
      password: '000',
      token: crypto.randomUUID(),
      image: 'fixtures/user.png',
      role: 'user',
    },
  );

  await db.close();
};

run().catch(console.error);
