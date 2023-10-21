import express from 'express';
import User from '../models/User';
import { Error } from 'mongoose';
import { imagesUpload } from '../multer';
import config from '../config';
import { OAuth2Client } from 'google-auth-library';
import * as crypto from 'crypto';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      image: req.file ? 'images/' + req.file.filename : null,
    });

    user.generateToken();

    await user.save();
    return res.send({ user: user });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ error: 'Wrong password or email!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Wrong password or email!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password correct!', user });
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = { message: 'Success' };

    if (!token) return res.send(success);

    const user = await User.findOne({ token });

    if (!user) return res.send(success);

    user.generateToken();
    user.save();

    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/google', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const picture = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }

    let user = await User.findOne({ googleId: id });

    if (!user) {
      user = new User({
        email: email,
        password: crypto.randomUUID(),
        image: picture ? picture : null,
        googleId: id,
        displayName,
      });
    }
    user.generateToken();

    await user.save();

    return res.send({ message: 'Login with Google successful!', user });
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
