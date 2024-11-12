import React, { useEffect } from 'react';
import { useBook } from '../../contexts/bookContext';
import StarRating from './starRating';
import Loading from '../loading/loading';
import { useParams } from 'react-router-dom';
import { GiBlackBook } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import Counter from './counter';

const BookDescription: React.FC = () => {
    const { fetchBookById, book, error, loading } = useBook();
    const { bookId } = useParams<{ bookId: string }>();

    useEffect(() => {
        if (bookId && !book && !loading) {
            fetchBookById(bookId);
        }
    }, [bookId, book, fetchBookById]);

    if (loading) return <Loading />;

    return (
        <div className='mx-52 monitor:mx-96 mt-20'>
            <div className='flex gap-x-20'>
                <div className='w-80 h-full flex-shrink-0'>
                    <img src={`data:image/jpeg;base64,${book?.coverImageUrl}`} className='w-80 h-auto flex-shrink-0 shadow-xl rounded-lg' />
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
                        <Counter availableCopies={book?.availableCopies || 0} />
                        <button
                            type="submit"
                            className="w-1/4 text-primary_2 bg-primary_4 focus:ring-4 focus:outline-none focus:ring-primary_3 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Add to Cart
                        </button>
                    </div>
                    <p className='text-accent-primary_4_light font-bold text-sm mt-2'>Only {book?.availableCopies} left in stock.</p>
                    <div className='flex w-fit mt-4 gap-1 group group-hover:text-pink-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 relative group-hover:fill-pink-700 group-hover:stroke-inherit cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <p className='text-accent-primary_4_light font-medium text-sm group-hover:text-pink-700 cursor-pointer'>Add to Whishlist</p>
                    </div>
                    <p className='text-base font-normal text-primary_4 mt-4 text-justify'>{book?.description}</p>

                </div>
            </div>
        </div>
    );
}

export default BookDescription;
