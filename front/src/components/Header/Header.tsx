import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { selectUser } from '../../features/users/usersSlice';
import { useAppSelector } from '../../app/hook';
import UserMenu from '../UserMenu/UserMenu';
import AnonymMenu from '../AnonymMenu/AnonymMenu';

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="header">
      <div className="header-inner">
        <div>
          <Link to={'/'} className="header-link">
            Control
          </Link>
        </div>

        {user ? <UserMenu /> : <AnonymMenu />}
      </div>
    </div>
  );
};

export default Header;
