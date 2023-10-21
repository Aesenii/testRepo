import React from 'react';
import { logout } from '../../features/users/usersThunk';
import { selectUser, unsetUser } from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const handleLogout = async () => {
    dispatch(logout());
    dispatch(unsetUser());
  };

  return (
    <div className="user-menu">
      <div className="user-info">
        <div>
          <Link to={'userPhotos/' + user?._id}>Hello, {user?.displayName}</Link>
          {user?.googleId ? (
            <img src={user?.image ? user?.image : ''} alt="img" />
          ) : (
            <img src={user?.image ? apiUrl + '/' + user?.image : ''} alt="img" />
          )}
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </div>
  );
};
export default UserMenu;
