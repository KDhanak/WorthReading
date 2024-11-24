import React, { useState } from 'react';
import { useBook } from '../../contexts/bookContext';

const Categories: React.FC = () => {
    const categories = ['All', 'Fictional', 'Non-fictional', 'Horror', 'Sci-Fi', 'Romance', 'History', 'Biography', 'Psychology', 'Politics', 'Thriller', 'Mystery', 'Education', 'Science', 'Comics'];

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const { selectedCategory, filterBooksByCategory, resetCategory } = useBook();

    const toggleCategories = () => {
        setIsCategoriesOpen((prev) => !prev);
    };

    const handleCategoryClick = (category: string) => {
        if (category === 'All') {
            resetCategory();
        } else {
            filterBooksByCategory(category);
        }
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
                        <ul className="mt-2 space-y-2 bg-primary_4 rounded-lg shadow-sm p-2 absolute opacity-90">
                            <ul className='p-2 text-sm font-medium text-primary_1'>{categories.map((category, index) => (
                                <li key={index} onClick={() => handleCategoryClick(category)} className={`py-1 border-b text-sm font-medium ${selectedCategory === category ? 'text-primary_2 hover:text-primary_3' : 'text-primary_1'} cursor-pointer ease-in-out duration-200`}>
                                    {category}
                                </li>
                            ))}</ul>
                        </ul>
                    )}
                </div>
            </div>
            <div className="hidden lLaptop:flex justify-center gap-1">
                {categories.map((category, index) => (
                    <div key={index} onClick={() => handleCategoryClick(category)} className={`border ${selectedCategory === category ? 'bg-primary_4 border-primary_1' : 'border-primary_2 bg-primary_1'}  py-2 h-fit px-4 rounded-lg shadow-sm cursor-pointer`}>
                        <p className={`font-semibold text-sm text-nowrap ${selectedCategory === category ? 'text-primary_2' : 'text-primary_4'}`}>{category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories;
