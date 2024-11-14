import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading';
import logo from '../../../public/logo.png';

const NavBar: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

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
        try {
            e.preventDefault();
            setLoading(true);
            logout();
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        
    }

    const handleSignIn = async (e: any) => {
        try {
            e.preventDefault();
            setLoading(true);
            navigate('/login');     
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    if (loading) return <Loading />;

    return (
        <nav className="bg-primary_1 text-primary_4 mx-52">
            <div className="pt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <a href="/" title="">
                            <img
                                className="block h-14"
                                src={logo}
                                alt="Worth a Read."
                            />
                        </a>

                        <ul className="hidden tablet:flex items-center justify-start gap-6 md:gap-8 py-3">
                            <li><a href="#" className="text-sm font-medium text-primary_4">Home</a></li>
                            <li><a href="#" className="text-sm font-medium text-primary_4">Best Sellers</a></li>
                            <li><a href="#" className="text-sm font-medium text-primary_4">About Us</a></li>
                        </ul>

                        <div className="tablet:hidden z-50">
                            <button
                                onClick={toggleMenu}
                                className="text-sm font-medium p-2 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                                </svg>
                            </button>

                            {/* Collapsible Menu */}
                            {isMenuOpen && (
                                <ul className="mt-2 space-y-2 border border-primary_1 bg-primary_4 rounded-md shadow-lg p-4 absolute opacity-90">
                                    <li><a href="#" className="py-1 border-b text-sm font-medium text-primary_1 hover:text-primary_2 ease-in-out duration-200">Home</a></li>
                                    <li><a href="#" className="py-1 border-b text-sm font-medium text-primary_1 hover:text-primary_2 ease-in-out duration-200">Best Sellers</a></li>
                                    <li><a href="#" className="py-1 border-b text-sm font-medium text-primary_1 hover:text-primary_2 ease-in-out duration-200">About Us</a></li>
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="flex relative items-center lg:space-x-2">
                        {isAuthenticated ? (
                            <div>
                                <button
                                    className="inline-flex items-center rounded-lg justify-center p-2 text-sm font-medium leading-none"
                                    onClick={() => navigate('/cart')}
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
                                </button>
                                <button
                                    id="userDropdownButton1"
                                    onClick={toggleDropdown}
                                    data-dropdown-toggle="userDropdown1"
                                    type="button"
                                    className="relative inline-flex border-2 border-primary_2 items-center rounded-lg justify-center p-2 text-sm font-medium leading-none"
                                >
                                    {/* Profile icon, visible on all screen sizes */}
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>

                                    {/* Username and dropdown arrow, hidden on smaller screens */}
                                    <span className="hidden laptop:inline-flex items-center">
                                        <span className="mx-1">{user?.name}</span>
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
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
                                    </span>
                                </button>
                                {isDropdownOpen && (
                                    <div id="userDropdown1" className="z-50 mt-0.5 right-4 absolute w-1/2 divide-y rounded-lg text-primary_2 bg-primary_4 shadow">
                                        <ul className="p-2 text-start text-sm font-medium text-primary_1">
                                            <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> My Account </a></li>
                                            <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent-primary_4_light"> My Orders </a></li>
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
