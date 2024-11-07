import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="w-full h-24 flex bg-purple-300 shadow-md px-4">
            <div className="flex items-center space-x-2">
                <Link to="/" className="text-2xl font-semibold text-gray-800 flex">
                    <img src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1730879639/header_image_acnocp.png" alt="Logo" className="h-20 w-20" />
                </Link>
                <div className="flex flex-col">
                    <p className='text-2xl'>
                        <span className='font-bold italic'>Loveto</span>
                        <span className='ml-1.5 text-base'>Create your love timeline</span>
                    </p>
                    <div className='text-xs flex items-center gap-x-1'>
                        <p className="text-sm text-gray-500">Powered by
                        </p>
                        <img className='h-10 w-12' src="https://loveto.greetsu.com/logo.svg" alt="greetsU_logo" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
