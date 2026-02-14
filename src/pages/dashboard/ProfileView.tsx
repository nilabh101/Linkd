import React from 'react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProfileView: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Profile</h2>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
    );
};
