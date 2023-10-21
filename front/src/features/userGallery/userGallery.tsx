import React, { useEffect, useState } from 'react';
import { selectUser } from '../users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Link, useParams } from 'react-router-dom';
import { selectUserGallery, selectUserGalleryLoading } from './userGallerySlice';
import Preloader from '../../components/Preloader/Preloader';
import { apiUrl } from '../../constants';
import { fetchUserPhotos } from './userGalleryThunk';
import { deletePhoto } from '../gallery/galleryThunk';
import './UserGallery.css';
import Modal from '../../components/Modal/Modal';

const UserGallery = () => {
  const user = useAppSelector(selectUser);
  const id = useParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectUserGallery);
  const loading = useAppSelector(selectUserGalleryLoading);

  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (id.id) {
      dispatch(fetchUserPhotos(id.id));
    }
  }, [id, dispatch]);

  const photoDelete = async (index: string) => {
    await dispatch(deletePhoto(index));
    await dispatch(fetchUserPhotos(id.id ? id.id : ''));
  };

  const onClose = () => {
    setModal(false);
  };

  return loading ? (
    <Preloader />
  ) : (
    <div className="user-gallery">
      {modal ? <Modal onClose={onClose} image={modalImage} /> : ''}
      <div className="user-gallery-toolbar">
        <h2>{!!photos.length && photos[0].user.displayName + '`s ' + 'photos'}</h2>
        {user?.displayName &&
        !!photos.length &&
        user?.displayName === photos[0].user.displayName ? (
          <Link to={'/addPhoto'}>Add photo</Link>
        ) : (
          ''
        )}
      </div>
      <div className="user-gallery-inner">
        {photos.length > 0 ? (
          photos.map((item) => (
            <div key={item._id} className="user-photo-item">
              <img
                onClick={() => {
                  setModal(true);
                  setModalImage(item.image ? item.image : '');
                }}
                src={item.image ? apiUrl + '/' + item.image : ''}
                alt={item.title}
              />
              <h3>{item.title}</h3>
              {user?._id === id.id || user?.role === 'admin' ? (
                <button onClick={() => photoDelete(item._id)}>Delete</button>
              ) : (
                ''
              )}
            </div>
          ))
        ) : (
          <div className="go-to-create">
            <h2 className="empty-title">No photos...</h2>
            {user?._id === id.id ? (
              <Link to={'/addPhoto'}>Would you like to add your first photo?</Link>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserGallery;
