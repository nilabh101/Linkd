import React from 'react';
import { AuthModal } from '../components/auth/AuthModal';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
            <AuthModal isOpen={true} onClose={() => navigate('/')} />
        </div>
    );
};

export default Auth;
