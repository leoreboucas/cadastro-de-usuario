import React from 'react';
import './logo.css'
import logo from '../../assets/imgs/logo.png'
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <aside className='logo'>
        <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
        </Link>
    </aside>
  );
}

export default Logo;