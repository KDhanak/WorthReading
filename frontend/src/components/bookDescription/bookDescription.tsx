import React, { useEffect, useState } from 'react';
import { useBook } from '../../contexts/bookContext';
import { useCart } from '../../contexts/cartContext';
import { useAuth } from '../../contexts/authContext';
import StarRating from './starRating';
import Loading from '../loading/loading';
import { useParams } from 'react-router-dom';
import { GiBlackBook } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import Counter from './counter';
import Toast from './toast';
import { useWishlist } from '../../contexts/wishlistContext';

const BookDescription: React.FC = () => {
    const { fetchBookById, book, loading } = useBook();
    const { addItemToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { bookId } = useParams<{ bookId: string }>();
    const [toastMessage, setToastMessage] = useState<{ success: boolean; message: string } | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState<boolean>(false);
    const { cart } = useCart();
    const [matchedBookQuantity, setMatchedBookQuantity] = useState<number | undefined>(0);
    const {wishlist, addItemToWishlist, fetchWishlist } = useWishlist();

    useEffect(() => {
        if (bookId && !book && !loading) {
            fetchBookById(bookId);
        }
    }, [bookId, book, fetchBookById]);

    const handleAddToCart = async () => {
        if (isAuthenticated === false) {
            setToastMessage({ success: false, message: 'Please login to add items to your cart' });
        } else {
            setMatchedBookQuantity((cart.find(item => item.productId?._id === bookId))?.quantity);
            if (bookId) {
                if (matchedBookQuantity || matchedBookQuantity === 0) {
                    if (book?.availableCopies !== undefined && matchedBookQuantity < book?.availableCopies) {
                        const success = await addItemToCart(bookId, quantity);
                        if (success) {
                            setToastMessage({ success: success, message: 'Items added to your cart' });
                        } else {
                            setToastMessage({ success: success, message: 'There was an error adding this item to your cart' })
                        }
                    } else {
                        setToastMessage({ success: false, message: 'Not enough books available.' });
                    }
                } else {
                    setToastMessage({ success: false, message: 'There was an error adding this item to your cart, there was no matchedQuantity.' })
                }
            }
        }

        setShowToast(true);
        setMatchedBookQuantity(0);
    };

    const handleAddToWishlist = async (bookId: string | undefined) => {
        if (!isAuthenticated) {
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

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    }, [showToast]);

    const isBookInWishlist = (bookId: string | undefined) => {
        return wishlist.some((item) => item.productId._id === bookId);
    };

    if (loading) return <Loading />;

    return (
        <div className='relative mx-52 monitor:mx-96 mt-20'>
            <div className='flex gap-x-20'>
                <div className='w-80 h-full flex-shrink-0'>
                    <img src={book?.coverImageUrl} className='w-80 h-auto flex-shrink-0 shadow-md rounded-lg' />
                </div>
                <div>
                    <p className='text-xl font-bold text-primary_4'>{book?.title}</p>
                    <p className='text-xs font-normal text-accent-primary_4_light'>by {book?.author}</p>
                    <StarRating stars={book?.stars || 0} />
                    <p className=' text-sm font-normal text-accent-primary_4_light'>{book?.reviews} reviews</p>
                    <p className='text-lg font-medium text-primary_3 mt-4'>${book?.price}</p>
                    <div className='flex text-base text-primary_4 mt-3'>
                        <GiBookCover className='size-10 text-primary_3 mr-2' />
                        <div className='flex flex-col -mt-1'>
                            <p>{book?.coverType}</p>
                            <p className='-mt-1'>{book?.pageCount} pages</p>
                        </div>
                        <GiBlackBook className='size-10 text-primary_3 mr-2 ml-4' />
                        <div className='flex -mt-1 flex-col'>
                            <p>Dimentions</p>
                            <p className='-mt-1'>{book?.dimensions}</p>
                        </div>
                    </div>
                    <div className='flex mt-3 gap-x-6'>
                        <Counter availableCopies={book?.availableCopies || 0} onQuantityChange={setQuantity} cartProductId={book?._id} />
                        <button
                            type="submit"
                            className="w-1/4 h-10 text-primary_2 bg-primary_4 focus:ring-4 focus:outline-none focus:ring-primary_3 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                    <p className='text-accent-primary_4_light font-bold text-sm mt-2'>Only {book?.availableCopies} left in stock.</p>
                    <button onClick={() => { if (book?._id) { handleAddToWishlist(book._id); } }} className='flex w-fit mt-4 gap-1 group group-hover:text-pink-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 relative ${isAuthenticated && isBookInWishlist(book?._id) ? 'fill-pink-700 stroke-pink-700': 'fill-none'} group-hover:fill-pink-700 group-hover:stroke-inherit cursor-pointer`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <p className={`font-medium text-sm ${isAuthenticated && isBookInWishlist(book?._id) ? 'text-pink-700' : 'text-accent-primary_4_light'} group-hover:text-pink-700 cursor-pointer`}>{isAuthenticated && isBookInWishlist(book?._id) ? 'In Wishlist' : 'Add to Wishlist'}</p>
                    </button>
                    <p className='text-base font-normal text-primary_4 mt-4 text-justify'>{book?.description}</p>

                </div>
            </div>
            {showToast && (
                <div className={`fixed top-24 right-0 transform -translate-x-1/2 transition-opacity duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Toast message={toastMessage} />
                </div>
            )}
        </div>
    );
}

export default BookDescription;
