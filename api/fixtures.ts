import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import crypto from 'crypto';
import Photo from './models/Photo';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection were not present, skipping drop...');
  }

  const [admin, user, user2] = await User.create(
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
    {
      email: 'user2@gmail.com',
      displayName: 'Arsa',
      password: '222',
      token: crypto.randomUUID(),
      image: 'fixtures/user2.png',
      role: 'user',
    },
  );

  await Photo.create(
    {
      title: 'Nature 1',
      image: 'fixtures/nature1.jpeg',
      user: admin._id,
    },
    {
      title: 'Nature 2',
      image: 'fixtures/nature2.jpeg',
      user: admin._id,
    },
    {
      title: 'Nature 3',
      image: 'fixtures/nature3.jpg',
      user: admin._id,
    },
    {
      title: 'Nature 4',
      image: 'fixtures/nature4.jpg',
      user: admin._id,
    },
    {
      title: 'Nature 5',
      image: 'fixtures/nature5.jpg',
      user: admin._id,
    },
    {
      title: 'Animals 1',
      image: 'fixtures/animals1.jpeg',
      user: user._id,
    },
    {
      title: 'Animals 2',
      image: 'fixtures/animals2.jpeg',
      user: user._id,
    },
    {
      title: 'Animals 3',
      image: 'fixtures/animals3.jpeg',
      user: user._id,
    },
    {
      title: 'Animals 4',
      image: 'fixtures/animals4.jpg',
      user: user._id,
    },
    {
      title: 'Animals 5',
      image: 'fixtures/animals5.jpg',
      user: user._id,
    },
    {
      title: 'Sunset 1',
      image: 'fixtures/sunset1.jpeg',
      user: user2._id,
    },
    {
      title: 'Sunset 2',
      image: 'fixtures/sunset2.jpeg',
      user: user2._id,
    },
    {
      title: 'Sunset 3',
      image: 'fixtures/sunset3.jpeg',
      user: user2._id,
    },
    {
      title: 'Sunset 4',
      image: 'fixtures/sunset4.jpeg',
      user: user2._id,
    },
    {
      title: 'Sunset 5',
      image: 'fixtures/sunset5.jpg',
      user: user2._id,
    },
  );

  await db.close();
};

run().catch(console.error);
