import React, { useEffect } from 'react';
import { selectUser } from '../users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Link, useParams } from 'react-router-dom';
import { fetchPhotos } from '../gallery/galleryThunk';
import { selectUserGallery, selectUserGalleryLoading } from './userGallerySlice';
import Preloader from '../../components/Preloader/Preloader';
import { apiUrl } from '../../constants';
import { fetchUserPhotos } from './userGalleryThunk';

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
