import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import api from './api';
import { CartItem, CartContextProps } from '../types';

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
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

    const fetchCart = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get('/api/cart');
            setCart(data.items);
            return true;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    setError({ code: 404, message: 'Cart not found' });
                } else if (error.response?.status === 401) {
                    setError({ code: 401, message: 'Unauthorized access' });
                } else {
                    handleApiError(error, 'An error occurred while fetching cart.');
                }
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addItemToCart = async (productId: string, quantity: number = 1) => {
        setLoading(true);
        try {
            const { data } = await api.post('/api/cart/add', { productId, quantity });
            setCart(data.items);
            return true;
        } catch (error: unknown) {
            handleApiError(error, 'An error occurred while adding to cart.')
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCart = async (productId: string, quantity: number) => {
        const previousCart = [...cart];
        setCart(cart.map(item => (item.productId._id === productId ? { ...item, quantity } : item)));
        setLoading(true);
        try {
            const { data } = await api.put('/api/cart/update', { productId, quantity });
            setCart(data.items);
            await fetchCart();
            return true;
        } catch (error: unknown) {
            setCart(previousCart);
            handleApiError(error, 'An error occurred while updating cart.')
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeItemFromCart = async (productId: string) => {
        const previousCart = [...cart];
        setLoading(true);
        try {
            const { data } = await api.delete(`/api/cart/remove/${productId}`);
            setCart(data.items);
            await fetchCart();
            return true;
        } catch (error: unknown) {
            setCart(previousCart);
            handleApiError(error, 'An error occurred while updating cart.')
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        setLoading(true);
        try {
            await api.delete('/api/cart/clear');
            setCart([]);
            return true;
        } catch (error: unknown) {
            handleApiError(error, 'An error occurred while removing cart.')

            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                setLoading,
                error,
                setError,
                fetchCart,
                addItemToCart,
                updateCart,
                removeItemFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
