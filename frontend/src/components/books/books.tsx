import React, { useState } from 'react';
import { useBook } from '../../contexts/bookContext';
import Loading from '../loading/loading';

const Books: React.FC = () => {
    const { books, error, loading } = useBook();
    if (loading) return <Loading />;
    return (
        <div className='mx-20'>
            <div className='mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6'>
                {books.map((book, index) => (
                    <div className="relative flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-64 grid grid-rows-[auto,1fr,auto]">
                        {/* Image container */}
                        <div className="relative p-2.5 w-64 h-80 overflow-hidden rounded-xl bg-clip-border">
                            <img
                                src={`data:image/jpeg;base64,${book.coverImageUrl}`}
                                alt="card-image"
                                className="h-full w-full object-cover rounded-md"
                            />
                        </div>
                        {/* Content section */}
                        <div className="p-4 relative flex flex-col">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-slate-800 text-xl font-semibold">
                                    {book.title}
                                </p>
                                <p className="text-primary_3 text-xl font-semibold">
                                    ${book.price}
                                </p>
                            </div>
                            <p className="text-slate-600 leading-normal font-light">
                                {book.summary}
                            </p>
                        </div>
                        {/* Buttons section at the bottom */}
                        <div className='flex relative left-5 bottom-3 gap-2 mt-3'>
                            <button className="text-primary_4 bg-primary_1 border-2 border-primary_2 active:ring-4 focus:outline-none active:ring-primary_3 font-medium rounded-lg text-sm px-14 py-2.5 text-center" type="button">
                                Add to Cart
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-8 hover:fill-pink-700 hover:stroke-inherit cursor-pointer">
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
