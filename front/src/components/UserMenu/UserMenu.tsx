import React from 'react';
import { logout } from '../../features/users/usersThunk';
import { selectUser, unsetUser } from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { apiUrl } from '../../constants';

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
          <h3>Hello, {user?.displayName}</h3>
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
