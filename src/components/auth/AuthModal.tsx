import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import classes from './AuthModal.module.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (provider: 'google' | 'apple' | 'phone') => {
        await login(provider);
        onClose();
        navigate('/onboarding');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Welcome back">
            <div className={classes.container}>
                <p className={classes.subtitle}>Sign in to continue your journey.</p>

                <div className={classes.options}>
                    <Button
                        variant="outline"
                        fullWidth
                        onClick={() => handleLogin('google')}
                        disabled={isLoading}
                    >
                        Continue with Google
                    </Button>

                    <Button
                        variant="outline"
                        fullWidth
                        onClick={() => handleLogin('apple')}
                        disabled={isLoading}
                    >
                        Continue with Apple
                    </Button>

                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => handleLogin('phone')}
                        disabled={isLoading}
                    >
                        Use Phone Number
                    </Button>
                </div>

                <p className={classes.disclaimer}>
                    By signing up, you agree to our Terms. See how we use your data in our Privacy Policy.
                </p>
            </div>
        </Modal>
    );
};
