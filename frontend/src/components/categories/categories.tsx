import React, { useState } from 'react';

const Categories: React.FC = () => {
    const categories = ['Fictional', 'Non-fictional', 'Horror', 'Sci-Fi', 'Romance', 'History', 'Biography', 'Psychology', 'Politics', 'Thriller', 'Mystery', 'Education', 'Science', 'Comics'];

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    const toggleCategories = () => {
        setIsCategoriesOpen((prev) => !prev);
    };
    return (
        <div className="text-primary_4 mt-5 pb-10 border-b-2 border-accent-primary_4_light mx-52">
            <div className='flex justify-center'>
                <p className="font-bold text-lg mb-3">Categories</p>
                <div className="lLaptop:hidden z-50">
                    <button
                        onClick={toggleCategories}
                        className="text-sm font-medium p-2 focus:outline-none"
                    >
                        <svg
                            className="w-4 h-4 text-gray-900"
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

                    {/* Collapsible Menu */}
                    {isCategoriesOpen && (
                        <ul className="mt-2 space-y-2 bg-primary_4 rounded-lg shadow p-2 absolute opacity-90">

                            <ul className='p-2 text-sm font-medium text-primary_1'>{categories.map((category, index) => (
                                <li key={index} className="py-1 border-b text-sm font-medium text-primary_1 cursor-pointer hover:text-primary_2 ease-in-out duration-200">
                                    {category}
                                </li>
                            ))}</ul>
                        </ul>
                    )}
                </div>
            </div>
            <div className="hidden lLaptop:flex justify-center gap-1">
                {categories.map((category, index) => (
                    <div key={index} className="border border-primary_2 py-2 h-fit px-4 rounded-lg shadow bg-primary_1 cursor-pointer">
                        <p className="font-semibold text-sm text-nowrap text-primary_4">{category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories;
