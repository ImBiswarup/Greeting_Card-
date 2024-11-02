import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='w-full h-20 flex items-center left-0  bg-purple-300'>
            <Link to={'/'}>
            Header
            </Link>
        </header>
    );
}

export default Header;
