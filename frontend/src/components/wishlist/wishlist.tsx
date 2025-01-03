import React from "react"
import Loading from "../loading/loading";
import { useState } from "react";
import { useBook } from "../../contexts/bookContext";

const Wishlist: React.FC = () => {
    const { setBook, filteredBook, loading, books, error,selectedCategory, filterBooksByTitle } = useBook();
    const [query, setQuery] = useState('');

    if (loading) return <Loading />;

    return (
        <div className='mx-52'>
            {/* <div className='flex w-full items-center justify-between mt-3'>
                <p className="font-bold text-lg text-primary_4 mx-auto">{selectedCategory}</p>
                <form className="relative w-full max-w-sm shadow-sm" onSubmit={handleSearchSubmit}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-primary_1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" onChange={handleInputChange} id="default-search" className="block w-full h-12 ps-10 text-sm text-primary_1 border rounded-lg bg-primary_4 focus:ring-primary_3 focus:border-primary_3 placeholder:text-primary_1" placeholder="Search for your favourite book" required />
                        <button type="submit" className="text-primary_4 border border-primary_2 absolute h-8 end-2.5 bottom-2.5 bg-primary_1 focus:ring-4 focus:outline-none focus:ring-primary_3 font-medium rounded-lg text-sm px-4 py-1">Search</button>
                    </div>
                </form>
            </div>
            <div className='grid grid-cols-1 lMobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 lLaptop:grid-cols-5 monitor:grid-cols-7 lLaptop:gap-0 4K:gap-x-0 gap-x-14'>
                {filteredBook.map((book, index) => (
                    <div key={index} className="relative flex-col my-4 justify-center mx-auto bg-white shadow-sm border border-slate-200 rounded-lg w-44 h-auto grid grid-rows-[auto,1fr,auto]" onClick={() => fetchSelectedBook(book._id)}>
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
                                stroke="currentColor"
                                fill="none"
                                className="w-7 h-7 flex-shrink-0 cursor-pointer hover:fill-primary_2 hover:stroke-primary_2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-5 relative hover:fill-pink-700 hover:stroke-inherit cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default Wishlist;

