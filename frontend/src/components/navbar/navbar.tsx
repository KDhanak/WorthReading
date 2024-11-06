import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import Loading from '../loading/loading';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    }

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('#userDropdownButton1')) {
            setIsDropdownOpen(false);
        }
    }

    const handleLogout = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        await logout();
    }

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        navigate('/login');
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    return (
        <nav className="bg-primary_1 text-primary_4">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <div className="shrink-0">
                            <a href="#" title="">
                                <img
                                    className="block w-auto h-8"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
                                    alt="Logo"
                                />
                                <img
                                    className="hidden w-auto h-8"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
                                    alt="Logo"
                                />
                            </a>
                        </div>

                        <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                            <li><a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-700">Home</a></li>
                            <li><a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-700">Best Sellers</a></li>
                            <li><a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-700">About Us</a></li>
                        </ul>
                    </div>

                    <div className="flex items-center lg:space-x-2">
                        <button
                            className="inline-flex items-center rounded-lg justify-center p-2 text-sm font-medium leading-none"
                        >
                            <span className="sr-only">Cart</span>
                            <svg
                                className="w-5 h-5 lg:me-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                />
                            </svg>
                            <span className="hidden sm:flex">My Cart</span>
                            <svg
                                className="hidden sm:flex w-4 h-4 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 9-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isAuthenticated ? (
                            <div>
                                <button id="userDropdownButton1" onClick={toggleDropdown} data-dropdown-toggle="userDropdown1" type="button" className="inline-flex border-2 border-primary_2 items-center rounded-lg justify-center p-2 text-sm font-medium leading-none">
                                    <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    {user?.name}
                                    <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <div id="userDropdown1" className="z-50 mt-0.5 absolute divide-y rounded-lg text-primary_2 bg-primary_4 shadow">
                                        <ul className="p-2 text-start text-sm font-medium text-primary_1">
                                            <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> My Account </a></li>
                                            <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> My Orders </a></li>
                                            <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> Settings </a></li>
                                            <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> Favourites </a></li>
                                            <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> Delivery Addresses </a></li>
                                            <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> Billing Data </a></li>
                                        </ul>

                                        <div className="p-2 text-sm font-medium text-primary_1">
                                            <button onClick={handleLogout} title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> Sign Out </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleSignIn}
                                type="submit"
                                className="text-primary_2 bg-primary_4 focus:ring-4 focus:outline-none focus:ring-primary_3 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign in
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
