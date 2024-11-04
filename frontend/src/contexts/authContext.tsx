import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import api from './api';

interface AuthContextProps {
	user: { id: string; name: string; email: string } | null;
	login: (email: string, password: string) => Promise<boolean>;
	register: (name: string, email: string, password: string) => Promise<boolean>;
	logout: () => void;
	isAuthenticated: boolean;
	error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const checkLoggedInUser = async () => {
			try {
				const token = Cookies.get('accessToken');
				console.log(token);
				if (token) {
					const response = await api.get('/api/auth/validate', { withCredentials: true});
					console.log(response);
					setUser(response.data.user);
				}
			} catch (error) {
				console.error('Failed to fetch user', error);
			}
		};
		checkLoggedInUser();
	}, []);

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			const response = await api.post('/api/auth/login', { email, password }, { withCredentials: true });
			const token = response.data.accessToken;
			Cookies.set('accessToken',token, {expires: 1/96, secure:true, sameSite: 'Strict'});
			setUser(response.data.user);
			setError(null);
			return true;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				setError(error.response.data.message);
			} else {
				setError('An error occurred during login');
			}
			return false;
		}
	};

	const register = async (name: string, email: string, password: string) => {
		try {
			const response = await api.post('/api/auth/register', { name, email, password });
			const token = response.data.accessToken;
			Cookies.set('accessToken',token, {expires: 1/96, secure:true, sameSite: 'Strict'});
			setUser(response.data.user);
			setError(null);
			return true;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				setError(error.response.data.message || 'Registration Failed');
			} else {
				setError('An error occurred during login');
			}
			return false;
		}
	};

	const logout = () => {
		api.post('/api/auth/logout', {}, { withCredentials: true })
			.then(() => {
				setUser(null);
				Cookies.remove('accessToken'); 
				Cookies.remove('refreshToken');
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
