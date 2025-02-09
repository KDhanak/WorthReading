import React, { useState } from "react"
import Loading from "../loading/loading";
import { useBook } from "../../contexts/bookContext";
import { useWishlist } from "../../contexts/wishlistContext";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/cartContext";
import Toast from '../bookDescription/toast';
import Empty from '../empty/empty';

const Wishlist: React.FC = () => {
    const { loading } = useBook();
    const { error, wishlist, removeItemFromWishlist, fetchWishlist, setLoading } = useWishlist();
    const { isAuthenticated } = useAuth();
    const { cart, addItemToCart, fetchCart, removeItemFromCart } = useCart();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<{ success: boolean; message: string } | null>(null);

    const isBookInWishlist = (bookId: string) => {
        return wishlist.some((item) => item.productId._id === bookId);
    };

    const isBookInCart = (bookId: string) => {
        return cart.some((item) => item.productId._id === bookId);
    }; 

    const handleAddToCart = async (bookId: string, availableCopies: number) => {
        if (!isAuthenticated) {
            setToastMessage({ success: false, message: 'Please login to add items to your cart' });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        if (!bookId || availableCopies <= 0) return;

        setLoading(true);

        try {
            if (isBookInCart(bookId)) {
                console.log(isBookInCart(bookId));
                const success = await removeItemFromCart(bookId);
                console.log(isBookInCart(bookId));
                console.log(success);
                if (success) {
                    const cartFetchSuccess = await fetchCart();
                    if (cartFetchSuccess) {
                        setToastMessage({ success: true, message: 'Item removed from your cart' });
                    } else {
                        setToastMessage({ success: false, message: 'Failed to update the cart' });
                    }
                } else {
                    setToastMessage({ success: false, message: 'There was an error removing this item from your cart' });
                }
            } else {
                const success = await addItemToCart(bookId, 1);
                if (success) {
                    const cartFetchSuccess = await fetchCart();
                    if (cartFetchSuccess) {
                        setToastMessage({ success: true, message: 'Item added to your cart' });
                    } else {
                        setToastMessage({ success: false, message: 'Failed to update the cart' });
                    }
                } else {
                    setToastMessage({ success: false, message: 'There was an error adding this item to your cart' });
                }
            }

        } catch (error) {
            setToastMessage({ success: false, message: 'An unexpected error occurred' });
        } finally {
            setLoading(false); // Stop loading
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const handleRemoveFromWhistlist = async (bookId: string) => {
        if (!isAuthenticated) {
            setToastMessage({ success: false, message: 'Please login to update items of your wishlist' });
        } else if (bookId) {
                const success = await removeItemFromWishlist(bookId);
                if (success) {
                    const wishlistFetchSuccess = await fetchWishlist();
                    if (wishlistFetchSuccess) {
                        setToastMessage({ success: true, message: 'Item removed from your wishlist' });
                    } else {
                        setToastMessage({ success: false, message: 'Failed to update the wishlist' });
                    }
                } else {
                    setToastMessage({ success: false, message: 'There was an error removing this item from your wishlist' });
                }
        }
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    }

    if (loading) return <Loading />;
    if (error?.code === 404 || !cart.length && !loading) return <Empty message='Your wishlist is empty.' />

    return (
        <div className='mx-52'>
            <div className='grid grid-cols-1 lMobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 lLaptop:grid-cols-5 monitor:grid-cols-7 lLaptop:gap-0 4K:gap-x-0 gap-x-14'>
                {wishlist.map((book, index) => (
                    <div key={index} className={`relative flex-col my-4 justify-center mx-auto bg-white shadow-sm border ${isAuthenticated && isBookInWishlist(book.productId._id) && isBookInCart(book.productId._id) ? 'border-t-primary_2 border-l-primary_2 border-b-pink-700 border-r-pink-700' : 'border-pink-700'} rounded-lg w-44 h-auto grid grid-rows-[auto,1fr,auto]`}>
                        <div className="relative w-[175px] h-auto overflow-hidden rounded-t-lg bg-clip-border">
                            <img
                                src={book.productId.coverImageUrl}
                                alt="card-image"
                                className="h-56 w-[174px] object-cover rounded-t-lg cursor-pointer"
                            />
                        </div>
                        <div className="flex justify-between mx-3 mt-2">
                            <p className="text-slate-800 text-sm font-medium cursor-pointer">
                                {book.title}
                            </p>
                            <svg
                                stroke="currentColor"
                                fill="none"
                                className={`w-7 h-7 flex-shrink-0 cursor-pointer hover:fill-primary_2 hover:stroke-primary_2 ${isAuthenticated && isBookInCart(book.productId._id) ? 'fill-primary_2 stroke-primary_2' : 'fill-none'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                onClick={() => handleAddToCart(book.productId._id, book.productId.availableCopies)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                />
                            </svg>
                        </div>
                        <div className='flex relative justify-between mx-3 bottom-3 gap-5 mt-3'>
                            <p className="text-primary_3 text-base font-semibold">
                                ${book.price}
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleRemoveFromWhistlist(book.productId._id)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`mt-1 size-5 relative hover:fill-pink-700 hover:stroke-inherit ${isAuthenticated && isBookInWishlist(book.productId._id) ? 'fill-pink-700 stroke-pink-700' : 'fill-none'} cursor-pointer`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
            {showToast && (
                <div className={`fixed top-24 -right-24 transform -translate-x-1/2 transition-opacity duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Toast message={toastMessage} />
                </div>
            )}
        </div>
    )
}

export default Wishlist;
