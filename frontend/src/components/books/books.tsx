import React, { useState } from 'react';
import { useBook } from '../../contexts/bookContext';
import Loading from '../loading/loading';
import { useNavigate } from 'react-router-dom';

const Books: React.FC = () => {
    const { setBook, books, error } = useBook();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchSelectedBook = (bookId: string) => {
        setBook(null);
        navigate(`/book/${bookId}`);
    }

    if (loading) return <Loading />;
    return (
        <div className='mx-52'>
            <div className='grid grid-cols-1 lMobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 lLaptop:grid-cols-5 monitor:grid-cols-7 lLaptop:gap-0 4K:gap-x-0 gap-x-14'>
                {books.map((book, index) => (
                    <div key={index} className="relative flex-col my-6 justify-center mx-auto bg-white shadow-xl border border-slate-200 rounded-lg w-44 h-auto grid grid-rows-[auto,1fr,auto]"  onClick={() => fetchSelectedBook(book._id)}>
                        <div className="relative w-44 h-auto overflow-hidden rounded-t-lg bg-clip-border">
                            <img
                                src={`data:image/jpeg;base64,${book.coverImageUrl}`}
                                alt="card-image"
                                className="h-56 w-44 object-cover rounded-t-lg cursor-pointer"
                            />
                        </div>
                        <div className="flex justify-between mx-3 mt-2">
                            <p className="text-slate-800 text-sm font-medium cursor-pointer">
                                {book.title}
                            </p>
                            <svg
                                strokeWidth={1.5}
                                stroke="currentColor"
                                fill="none"
                                className="w-7 h-7 flex-shrink-0 cursor-pointer hover:fill-primary_2 hover:stroke-inherit"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
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
                        </div>
                        <div className='flex relative justify-between mx-3 bottom-3 gap-5 mt-3'>
                            <p className="text-primary_3 text-base font-semibold">
                                ${book.price}
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-5 relative hover:fill-pink-700 hover:stroke-inherit cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;
