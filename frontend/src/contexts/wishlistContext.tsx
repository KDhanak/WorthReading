import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import api from './api';
import { WishlistItem, WishlistContextProps } from '../types';

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ code: number | null, message: string | null } | null>(null);

    const handleApiError = (error: unknown, defaultMessage: string) => {
        if (axios.isAxiosError(error) && error.response) {
            const code = error.response.status;
            const message = error.response.data.message || defaultMessage;
            setError({ code, message });
        } else {
            setError({ code: null, message: defaultMessage });
        }
    };

    const fetchWishlist = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get('/api/wishlist');
            setWishlist(data.items);
            return true;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    setError({ code: 404, message: 'Wishlist not found' });
                } else if (error.response?.status === 401) {
                    setError({ code: 401, message: 'Unauthorized access' });
                } else {
                    handleApiError(error, 'An error occurred while fetching the wishlist.');
                }
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addItemToWishlist = async (productId: string) => {
        console.log(productId);
        setLoading(true);
        try {
            const { data } = await api.post('/api/wishlist/add', { productId });
            setWishlist(data.items);
            return true;
        } catch (error: unknown) {
            handleApiError(error, 'An error occurred while adding to the wishlist.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeItemFromWishlist = async (productId: string) => {
        setLoading(true);
        try {
            const { data } = await api.delete(`/api/wishlist/remove/${productId}`);
            setWishlist(data.items);
            return true;
        } catch (error: unknown) {
            handleApiError(error, 'An error occurred while removing from the wishlist.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                loading,
                setLoading,
                error,
                setError,
                fetchWishlist,
                addItemToWishlist,
                removeItemFromWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use the WishlistContext
export const useWishlist = (): WishlistContextProps => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
