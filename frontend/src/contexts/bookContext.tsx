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
    pageCount: number;
    language: string;
    isbn: string;
    publisher?: string;
    availableCopies: number;
    coverImageUrl: string;
    book: number;
}

interface BookContextProps {
    books: Books[];
    loading: boolean;
    error: string | null;
    fetchBooks: () => Promise<void>
};

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [books, setBooks] = useState<Books[]>([]);
    const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<{data: Books[]}>('/api/auth/books');
            setBooks(response.data.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.message) {
                setError(error.response?.data.message || 'Failed to fetch books');
            } else {
                setError('An error occurred while fetching books');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <BookContext.Provider value={{books, loading, error, fetchBooks}}>
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
