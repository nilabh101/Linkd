import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flame, Star, MessageCircle, User } from 'lucide-react';
import styles from './AppNavbar.module.css';

export const AppNavbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/dashboard/discover" className={({ isActive }) => isActive ? styles.active : styles.link}>
                <Flame size={24} />
            </NavLink>
            <NavLink to="/dashboard/curated" className={({ isActive }) => isActive ? styles.active : styles.link}>
                <Star size={24} />
            </NavLink>
            <NavLink to="/dashboard/chat" className={({ isActive }) => isActive ? styles.active : styles.link}>
                <MessageCircle size={24} />
            </NavLink>
            <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? styles.active : styles.link}>
                <User size={24} />
            </NavLink>
        </nav>
    );
};
