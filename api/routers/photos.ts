import express from 'express';
import Photo from '../models/Photo';

const photosRouter = express.Router();

photosRouter.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().populate('user', 'displayName');
    return res.send(photos);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default photosRouter;
