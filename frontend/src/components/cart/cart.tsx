import React, { useEffect, useState, useMemo } from 'react';
import { useCart } from '../../contexts/cartContext';
import { useAuth } from '../../contexts/authContext';
import { useWishlist } from '../../contexts/wishlistContext';
import Loading from '../loading/loading';
import { useNavigate } from 'react-router-dom';
import CartCounter from './cartCounter';
import Empty from '../empty/empty';
import Toast from '../bookDescription/toast';

const Cart: React.FC = () => {
    const { cart, setError, removeItemFromCart, error, loading, setLoading, clearCart, fetchCart } = useCart();
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState<{ success: boolean; message: string } | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const { isAuthenticated } = useAuth();
    const { wishlist, fetchWishlist, addItemToWishlist } = useWishlist();
    const [authStatus, setAuthStatus] = useState(isAuthenticated);

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        setAuthStatus(isAuthenticated);
    }, [isAuthenticated]);

    const handleRemoveItem = async (productId: string) => {
        await removeItemFromCart(productId);
        fetchCart();
    };

    const handleClearCart = async () => {
        setLoading(true);
        const success = await clearCart();
        setToastMessage({ success, message: success ? 'Cart cleared' : 'Error clearing cart' });
        setLoading(false);
        setShowToast(true);
    };

    const handleAddToWishlist = async (bookId: string) => {
        if (!authStatus) {
            setToastMessage({ success: false, message: 'Please login to add items to your wishlist' });
        } else if (bookId) {
            const success = await addItemToWishlist(bookId);
            if (success) {
                const wishlistFetchSuccess = await fetchWishlist();
                if (wishlistFetchSuccess) {
                    setToastMessage({ success: true, message: 'Item added to your wishlist' });
                } else {
                    setToastMessage({ success: false, message: 'Failed to update the wishlist' });
                }
            } else {
                if (isBookInWishlist(bookId)) {
                    setToastMessage({ success: false, message: 'This item is already in your wishlist' });
                } else {
                    setToastMessage({ success: false, message: 'There was an error adding this item to your wishlist' });
                }
            }
        }
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    }

    const isBookInWishlist = (productId: string): boolean => {
        return wishlist?.some(item => item.productId._id === productId) ?? false;
    };

    useEffect(() => {
        if (!authStatus && error?.code === 401) {
            navigate('/login');
            setError(null);
        }
    }, [authStatus, setError, error, navigate]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const total = parseFloat((cart.reduce((total, cartItems) => total + cartItems.quantity * cartItems.price, 0)).toFixed(2));
    const delivery = 5;

    if (loading) return <Loading />;
    if (error?.code === 404 || !cart.length && !loading) return <Empty message='Your cart is empty.' />

    return (
        <section className="mx-52 my-10">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className=" text-2xl mx-auto text-center font-semibold text-primary_4">Shopping Cart</h2>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {cart.map((cartItems, index) => (
                                <div key={index} className="rounded-lg border border-primary_2 bg-white shadow-sm">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="hidden h-40 w-32 dark:block shadow-sm rounded-s-lg" src={cartItems.productId.coverImageUrl} alt="imac image" />
                                        </a>

                                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <CartCounter availableCopies={cartItems.productId.availableCopies || 0} onQuantityChange={() => { }} cartProductId={cartItems.productId._id} />
                                            <div className="text-center md:order-4 md:w-32">
                                                <p className="text-base font-bold text-primary_4">${(cartItems.price * cartItems.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <a href="#" className="text-base font-medium text-primary_4">{cartItems.productId.title}</a>
                                            <div className="flex items-center gap-4">
                                                <button className='flex w-fit gap-1 group group-hover:text-pink-700' onClick={() => handleAddToWishlist(cartItems.productId._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 relative ${authStatus && isBookInWishlist(cartItems.productId._id) ? 'fill-pink-700 stroke-pink-700' : 'fill-none'} group-hover:fill-pink-700 group-hover:stroke-inherit cursor-pointer`}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                    </svg>
                                                    <p
                                                        className={`font-medium text-sm ${authStatus && isBookInWishlist(cartItems.productId._id)
                                                            ? 'text-pink-700'
                                                            : 'text-accent-primary_4_light'
                                                            } group-hover:text-pink-700 cursor-pointer`}
                                                    >
                                                        {authStatus && isBookInWishlist(cartItems.productId._id)
                                                            ? 'In Wishlist'
                                                            : 'Add to Wishlist'}
                                                    </p>
                                                </button>

                                                <button type="button" disabled={loading} onClick={() => handleRemoveItem(cartItems.productId._id)} className="inline-flex items-center text-sm font-medium text-red-600 group group-hover:text-red-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 group-hover:fill-red-900 group-hover:stroke-white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                    <p className='text-red-600 font-medium text-sm group-hover:text-pink-700 cursor-pointer'>{loading ? 'Removing' : 'Remove'}</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className="hidden xl:mt-8 xl:block">
                            <h3 className="text-2xl font-semibold text-primary_4">People also bought</h3>
                            <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                                <div className="space-y-6 overflow-hidden rounded-lg border border-primary_2 bg-white p-6 shadow-sm">
                                    <a href="#" className="overflow-hidden rounded">
                                        <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image" />
                                        <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image" />
                                    </a>
                                    <div>
                                        <a href="#" className="text-lg font-semibold leading-tight text-primary_4 hover:underline">Playstation 5</a>
                                        <p className="mt-2 text-base font-normal text-gray-500">This generation has some improvements, including a longer continuous battery life.</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-primary_4">
                                            <span className="line-through"> $799,99 </span>
                                        </p>
                                        <p className="text-lg font-bold leading-tight text-red-600">$499</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2.5">
                                        <button data-tooltip-target="favourites-tooltip-2" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-primary_4 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                            </svg>
                                        </button>
                                        <div id="favourites-tooltip-2" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                                            Add to favourites
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                        <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                            </svg>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-primary_2 bg-white p-4 shadow-sm sm:p-6">
                            <p className="text-xl font-semibold text-primary_4">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Total</dt>
                                        <dd className="text-base font-medium text-primary_4">${total}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Delivery</dt>
                                        <dd className="text-base font-medium text-primary_4">${delivery}</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                    <dt className="text-base font-bold text-primary_4">Total</dt>
                                    <dd className="text-base font-bold text-primary_4">${(total + delivery).toFixed(2)}</dd>
                                </dl>
                            </div>

                            <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Proceed to Checkout</a>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500"> or </span>
                                <a href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline">
                                    Continue Shopping
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg border border-primary_2 bg-white p-4 shadow-sm sm:p-6">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-primary_4"> Do you have a voucher or gift card? </label>
                                    <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-primary_4 focus:border-primary-500 focus:ring-primary-500" placeholder="" required />
                                </div>
                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-primary_4 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Apply Code</button>
                            </form>
                        </div>
                        <div className='flex justify-center'>
                            <button className='text-red-500 cursor-pointer hover:text-pink-700 underline' onClick={() => handleClearCart()}>clear cart</button>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <div className={`fixed top-24 right-0 transform -translate-x-1/2 transition-opacity duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Toast message={toastMessage} />
                </div>
            )}
        </section>
    );
};

export default Cart;
