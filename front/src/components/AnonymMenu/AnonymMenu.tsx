import React from 'react';
import '../Header/Header.css';
import { Link } from 'react-router-dom';

const AnonymMenu = () => {
  return (
    <div>
      <Link to={'/register'} className="link-reg-log">
        Sign up
      </Link>
      <Link to={'/login'} className="link-reg-log">
        Sign on
      </Link>
    </div>
  );
};

export default AnonymMenu;
