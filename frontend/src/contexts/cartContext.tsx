import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

interface CartContextProps {
    cart: CartItem[];
    loading: boolean;
    error: string | null;
    addItemToCart: (productId: string, quantity?: number) => Promise<boolean>;
    removeItemFromCart: (productId: string) => Promise<boolean>;
    updateCart: (productId: string, quantity: number) => Promise<boolean>;
    clearCart: () => Promise<boolean>;
    fetchCart: () => Promise<boolean>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get('/api/cart');
            setCart(data.items);
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.message) {
                setError(error.response?.data.message || 'Failed to fetch cart');
            } else {
                setError('An error occurred while fetching cart');
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
            if (axios.isAxiosError(error) && error.message) {
                setError(error.response?.data.message || 'Failed to add to cart');
            } else {
                setError('An error occurred while adding to cart');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCart = async (productId: string, quantity: number) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/cart/update', { productId, quantity });
            setCart(data.items);
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.message) {
                setError(error.response?.data.message || 'Failed to update the cart');
            } else {
                setError('An error occurred while updating cart');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeItemFromCart = async (productId: string) => {
        setLoading(true);
        try {
            const { data } = await api.post('/api/cart/remove', { productId });
            setCart(data.items);
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.message) {
                setError(error.response?.data.message || 'Failed to update the cart');
            } else {
                setError('An error occurred while updating cart');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        setLoading(true);
        try {
            await api.post('/api/cart/clear');
            setCart([]);
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.message) {
                setError(error.response?.data.message || 'Failed to clear the cart');
            } else {
                setError('An error occurred while clearing cart');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
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
