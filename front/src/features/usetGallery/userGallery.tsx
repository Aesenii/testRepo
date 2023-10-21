import React, { useEffect } from 'react';
import { selectUser } from '../users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useParams } from 'react-router-dom';
import { selectUserGallery, selectUserGalleryLoading } from './userGallerySlice';
import Preloader from '../../components/Preloader/Preloader';
import { apiUrl } from '../../constants';
import { deletePhoto, fetchUserPhotos } from './userGalleryThunk';
import './UserGallery.css';

const UserGallery = () => {
  const user = useAppSelector(selectUser);
  const id = useParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectUserGallery);
  const loading = useAppSelector(selectUserGalleryLoading);

  useEffect(() => {
    if (id.id) {
      dispatch(fetchUserPhotos(id.id));
    }
  }, [id, dispatch]);

  const photoDelete = async (index: string) => {
    await dispatch(deletePhoto(index));
    await dispatch(fetchUserPhotos(id.id ? id.id : ''));
  };

  return loading ? (
    <Preloader />
  ) : (
    <div className="user-gallery">
      <h2>{photos.length > 0 ? photos[0].user.displayName + '`s ' + 'gallery' : ''}</h2>
      <div className="user-gallery-inner">
        {photos.length > 0 ? (
          photos.map((item) => (
            <div key={item._id} className="user-photo-item">
              <img src={item.image ? apiUrl + '/' + item.image : ''} alt={item.title} />
              <h3>{item.title}</h3>
              {user?._id === id.id || user?.role === 'admin' ? (
                <button onClick={() => photoDelete(item._id)}>Delete</button>
              ) : (
                ''
              )}
            </div>
          ))
        ) : (
          <h2 className="empty-title">Empty...</h2>
        )}
      </div>
    </div>
  );
};
export default UserGallery;
