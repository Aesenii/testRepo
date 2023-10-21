import React, { useEffect } from 'react';
import { selectPhotos, selectPhotosLoading } from './gallerySlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import Preloader from '../../components/Preloader/Preloader';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import './Gallery.css';
import { fetchPhotos } from './galleryThunk';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const loading = useAppSelector(selectPhotosLoading);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  console.log(photos);

  return loading ? (
    <Preloader />
  ) : (
    <div className="gallery">
      <div className="gallery-inner">
        {photos.length > 0 ? (
          photos.map((item) => (
            <div key={item._id} className="photo-item">
              <img src={item.image ? apiUrl + '/' + item.image : ''} alt={item.title} />
              <h3>{item.title}</h3>
              <Link to={'fullInfo/' + item._id}>By {item.user.displayName}</Link>
            </div>
          ))
        ) : (
          <h2 className="empty-title">Empty...</h2>
        )}
      </div>
    </div>
  );
};

export default Gallery;
