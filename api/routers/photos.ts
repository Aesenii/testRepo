import express from 'express';
import Photo from '../models/Photo';

const photosRouter = express.Router();

photosRouter.get('/', async (req, res) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      const photos = await Photo.find().populate('user', 'displayName');
      return res.send(photos);
    }

    const photos = await Photo.find({ user: userId }).populate('user', 'displayName');
    return res.send(photos);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default photosRouter;
