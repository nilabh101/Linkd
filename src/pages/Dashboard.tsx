import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../components/layout/AppNavbar';

const Dashboard: React.FC = () => {
    return (
        <div style={{ paddingBottom: '70px', minHeight: '100vh', background: 'var(--color-background)' }}>
            <Outlet />
            <AppNavbar />
        </div>
    );
};

export default Dashboard;
