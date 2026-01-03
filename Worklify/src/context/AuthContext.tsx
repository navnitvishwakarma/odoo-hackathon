import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthState, AuthContextType } from '../types';
import api from '../api/axios';

console.log('AuthContext Module: Loading...');

// Local definition removed, using imported AuthContextType from ../types

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Load User on Mount
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setState({ user: null, isAuthenticated: false, isLoading: false });
                return;
            }

            try {
                // We use the imported api instance which auto-attaches the token
                const res = await api.get('/auth/me');
                setState({
                    user: res.data,
                    isAuthenticated: true,
                    isLoading: false
                });
            } catch (err) {
                console.error('Auth Error:', err);
                localStorage.removeItem('token');
                setState({ user: null, isAuthenticated: false, isLoading: false });
            }
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const res = await api.post('/auth/login', { email, password });

            localStorage.setItem('token', res.data.token);

            setState({
                user: res.data.user,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (err) {
            console.error('Login Failed', err);
            setState(prev => ({ ...prev, isLoading: false }));
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
