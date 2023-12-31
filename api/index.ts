import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routers/users';
import config from './config';
import photosRouter from './routers/photos';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/photos', photosRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(port.toString());
  });
};

run().catch((e) => console.error(e));
