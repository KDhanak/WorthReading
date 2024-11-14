import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';

interface Books {
    _id: string;
    title: string;
    author: string;
    publishedDate: Date;
    genres: string[];
    summary?: string;
    description?: string;
    pageCount: number;
    language: string;
    isbn: string;
    publisher?: string;
    availableCopies: number;
    coverImageUrl: string;
    price: number;
    coverType: string;
    dimensions: string;
    reviews: number;
    stars: number;
};

interface BookContextProps {
    book: Books | null;
    setBook: React.Dispatch<React.SetStateAction<Books | null>>;
    books: Books[];
    filteredBook: Books[];
    loading: boolean;
    error: string | null;
    fetchBooks: () => Promise<boolean>;
    fetchBookById: (id: string) => Promise<boolean>;
    filterBooksByCategory: (category: string | null) => void;
    selectedCategory: string | null;
    resetCategory: () => void;
    filterBooksByTitle: (title: string) => void;
};

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [books, setBooks] = useState<Books[]>([]);
    const [filteredBook, setFilteredBooks] = useState<Books[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<Books | null>(null);

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<{ data: Books[] }>('/api/auth/books');
            setBooks(response.data.data);
            applyCategoryFilter(response.data.data, selectedCategory);
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.message) {
                setError(error.response?.data.message || 'Failed to fetch books');
            } else {
                setError('An error occurred while fetching books');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const filterBooksByCategory  = (category: string | null) => {
        setSelectedCategory(category);
        applyCategoryFilter(books, category);
    };

    const applyCategoryFilter = (books: Books[], category: string | null) => {
        if (category) {
            setFilteredBooks(books.filter(book => book.genres.includes(category)));
        } else {
            setFilteredBooks(books);
        }
    };

    const resetCategory = () => {
        setSelectedCategory(null);
        setFilteredBooks(books);
    };

    const filterBooksByTitle = (title: string) => {
        setFilteredBooks(books.filter(book => book?.title.toLowerCase().includes(title.toLowerCase())));
    }

    const fetchBookById = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<{ data: Books }>(`/api/auth/book/${id}`);
            if (book?._id !== response?.data.data._id) {
                setBook(response.data.data);
            }
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.message) {
                setError(error.response?.data.message || 'Failed to fetch the book');
            } else {
                setError('An error occurred while fetching the book');
            }
            return false;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <BookContext.Provider value={{setBook, book, books, loading, error, fetchBooks, fetchBookById, filteredBook, filterBooksByCategory, selectedCategory, resetCategory, filterBooksByTitle }}>
            {children}
        </BookContext.Provider>
    )
};

export const useBook = (): BookContextProps => {
    const context = useContext(BookContext);
    if (context === undefined) {
        throw new Error('useBook must be used within a BookProvider');
    }
    return context;
};
