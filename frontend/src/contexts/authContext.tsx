import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';

interface AuthContextProps {
	user: { id: string; name: string; email: string } | null;
	login: (email: string, password: string) => Promise<boolean>;
	register: (name: string, email: string, password: string) => Promise<boolean>;
	logout: () => void;
	isAuthenticated: boolean;
	error: string | null;
	loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const handleApiError = (error: unknown, defaultMessage: string) => {
		if (axios.isAxiosError(error) && error.response) {
			setError(error.response.data.message || defaultMessage);
		} else {
			setError(defaultMessage);
		}
	};

	useEffect(() => {
		const checkLoggedInUser = async () => {
		  try {
			const response = await api.get('/api/auth/validate', { withCredentials: true });
			setUser(response.data.user);
		  } catch (error: unknown) {
			console.error('Failed to fetch user', error);
			setUser(null);  // Reset user if validation fails
		  } finally {
			setLoading(false); // Set loading to false after attempting to check user status
		  }
		};
		checkLoggedInUser();
	  }, []);

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			const response = await api.post('/api/auth/login', { email, password }, { withCredentials: true });
			setUser(response.data.user);
			setError(null);
			return true;
		} catch (error: unknown) {
			handleApiError(error, 'An error occurred during login');
			return false;
		}
	};

	const register = async (name: string, email: string, password: string) => {
		try {
			const response = await api.post('/api/auth/register', { name, email, password });
			const token = response.data.accessToken;
			setUser(response.data.user);
			setError(null);
			return true;
		} catch (error: unknown) {
			handleApiError(error, 'An error occurred during register');
			return false;
		}
	};

	const logout = () => {
		api.post('/api/auth/logout', {}, { withCredentials: true })
			.then(() => {
				setUser(null);
			})
			.catch((error: unknown) => console.error('Logout error:', error));
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, error, loading }}>
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
