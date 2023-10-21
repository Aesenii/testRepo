import React, { useEffect, useState } from 'react';
import { selectPhotos, selectPhotosLoading } from './gallerySlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import Preloader from '../../components/Preloader/Preloader';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import './Gallery.css';
import { fetchPhotos } from './galleryThunk';
import Modal from '../../components/Modal/Modal';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const loading = useAppSelector(selectPhotosLoading);

  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const onClose = () => {
    setModal(false);
  };

  return loading ? (
    <Preloader />
  ) : (
    <div className="gallery">
      {modal ? <Modal onClose={onClose} image={modalImage} /> : ''}
      <div className="gallery-inner">
        {photos.length > 0 ? (
          photos.map((item) => (
            <div key={item._id} className="photo-item">
              <img
                onClick={() => {
                  setModal(true);
                  setModalImage(item.image ? item.image : '');
                }}
                src={item.image ? apiUrl + '/' + item.image : ''}
                alt={item.title}
              />
              <h3>{item.title}</h3>
              <Link to={'userPhotos/' + item.user._id.toString()}>By {item.user.displayName}</Link>
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
