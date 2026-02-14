import { createContext, useContext, useState, type ReactNode } from 'react';

// Define the User type
export interface User {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
    isPremium: boolean;
    profileImage?: string;
    preferences?: {
        ageRange: [number, number];
        distance: number;
        gender: 'male' | 'female' | 'everyone';
    };
}

interface AuthContextType {
    user: User | null;
    login: (provider: 'google' | 'apple' | 'phone') => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (_provider: 'google' | 'apple' | 'phone') => {
        setIsLoading(true);
        // Mock login delay
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setUser({
                    id: 'mock-user-123',
                    name: 'Demo User',
                    email: 'demo@linkd.app',
                    isVerified: false,
                    isPremium: false,
                });
                setIsLoading(false);
                resolve();
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated: !!user }}>
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
