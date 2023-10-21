import express from 'express';
import Photo from '../models/Photo';
import auth, { RequestWithUser } from '../midleware/auth';
import { imagesUpload } from '../multer';
import { Error } from 'mongoose';

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

photosRouter.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;

    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).send('Not found!');
    }

    await Photo.findByIdAndRemove(id);
    return res.send('Deleted');
  } catch (e) {
    return res.status(500).send('error');
  }
});

photosRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const photo = new Photo({
      user: user.id,
      title: req.body.title,
      image: req.file ? 'images/' + req.file.filename : null,
    });

    await photo.save();
    return res.send(photo);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default photosRouter;
