import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthContextProps {
	user: { id: string; name: string; email: string } | null;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
	const [error, setError] = useState<string | null>(null);

	const login = async (email: string, password: string): Promise<void> => {
		try {
			const response = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
			setUser(response.data.user);
			setError(response.data.message);
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				setError(error.response.data.message);
			} else {
				setError('An error occurred during login');
			}
		}
	};

	const register = async (name: string, email: string, password: string) => {
		try {
			const response = await axios.post('/api/auth/register', { name, email, password });
			setUser(response.data.user);
			setError(response.data.message);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				setError(error.response.data.message || 'Registration Failed');
			} else {
				setError('An error occurred during login');
			}
		}
	};

	const logout = () => {
		axios.post('/api/auth/logout', {}, { withCredentials: true })
			.then(() => {
				setUser(null);
				Cookies.remove('token'); // Clear token from cookies on logout
			})
			.catch((error) => console.error('Logout error:', error));
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, error }}>
			{children}
		</AuthContext.Provider>
	);
};

// Hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
