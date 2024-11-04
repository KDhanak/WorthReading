import React from 'react';
import { useAuth } from '../../contexts/authContext';

const NavBar: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    console.log(isAuthenticated);

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
                            <li><a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-700">Gift Ideas</a></li>
                            <li><a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-700">Today's Deals</a></li>
                            <li><a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-700">Sell</a></li>
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
                            <button id="userDropdownButton1" data-dropdown-toggle="userDropdown1" type="button" className="inline-flex items-center rounded-lg justify-center p-2 text-sm font-medium leading-none">
                                <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                {user?.name}
                                <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                </svg>
                            </button>
                        ) : (
                            <button id="userDropdownButton1" data-dropdown-toggle="userDropdown1" type="button" className="inline-flex items-center rounded-lg justify-center p-2 text-sm font-medium leading-none">
                                <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Account
                                <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
