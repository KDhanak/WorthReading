import React, { useEffect } from 'react';
import { useBook } from '../../contexts/bookContext';
import StarRating from './starRating';
import Loading from '../loading/loading';
import { useParams } from 'react-router-dom';
import { GiBlackBook } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";

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
        <div className='mx-96 mt-20'>
            <div className='flex gap-x-20'>
                <div className='w-80 h-full flex-shrink-0'>
                    <img src={`data:image/jpeg;base64,${book?.coverImageUrl}`} className='w-80 h-auto flex-shrink-0 shadow-xl rounded-lg' />
                </div>
                <div>
                    <p className='text-xl font-bold text-primary_4'>{book?.title}</p>
                    <p className='text-xs font-normal text-accent-primary_4_light'>by {book?.author}</p>
                    <StarRating stars={book?.stars || 0}/>
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
                    <p className='text-base font-normal text-primary_4 mt-4 text-justify'>{book?.description}</p>

                </div>
            </div>
        </div>
    );
}

export default BookDescription;
