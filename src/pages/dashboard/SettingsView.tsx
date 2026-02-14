import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, User, Shield, FileText, LogOut, PauseCircle, Trash2, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import styles from './SettingsView.module.css';

export const SettingsView: React.FC = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = () => {
        // TODO: Call authHelpers.signOut()
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('auth_token');
            navigate('/');
        }
    };

    const handlePauseAccount = () => {
        // TODO: Update profile is_paused = true in Supabase
        if (confirm('Your account will be hidden from discovery. You can reactivate anytime.')) {
            console.log('Account paused');
            alert('Account paused successfully!');
        }
    };

    const handleDeleteAccount = () => {
        // TODO: Call Supabase RPC to delete user data
        if (confirm('⚠️ This action is permanent. All your data will be deleted. Are you sure?')) {
            const confirmText = prompt('Type "DELETE" to confirm:');
            if (confirmText === 'DELETE') {
                console.log('Account deleted');
                navigate('/');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Settings</h2>

            {/* Account Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Account</h3>

                <Card className={styles.settingItem} interactive onClick={() => navigate('/dashboard/profile/edit')}>
                    <User size={20} className={styles.icon} />
                    <span className={styles.settingText}>Edit Profile</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>

                <Card className={styles.settingItem} interactive onClick={handleLogout}>
                    <LogOut size={20} className={styles.icon} />
                    <span className={styles.settingText}>Logout</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>

                <Card className={styles.settingItem} interactive onClick={handlePauseAccount}>
                    <PauseCircle size={20} className={styles.icon} />
                    <span className={styles.settingText}>Pause Account</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>

                <Card className={styles.settingItem} interactive onClick={handleDeleteAccount} style={{ borderColor: 'var(--color-error)' }}>
                    <Trash2 size={20} className={styles.icon} style={{ color: 'var(--color-error)' }} />
                    <span className={styles.settingText} style={{ color: 'var(--color-error)' }}>Delete Account</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>
            </div>

            {/* Appearance Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Appearance</h3>

                <Card className={styles.settingItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {theme === 'dark' ? <Moon size={20} className={styles.icon} /> : <Sun size={20} className={styles.icon} />}
                        <span className={styles.settingText}>
                            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                        </span>
                    </div>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </Card>
            </div>

            {/* Privacy & Safety Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Privacy & Safety</h3>

                <Card className={styles.settingItem} interactive>
                    <Shield size={20} className={styles.icon} />
                    <span className={styles.settingText}>Privacy Settings</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>

                <Card className={styles.settingItem} interactive>
                    <Shield size={20} className={styles.icon} />
                    <span className={styles.settingText}>Blocked Users</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>
            </div>

            {/* Legal Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Legal</h3>

                <Card className={styles.settingItem} interactive onClick={() => window.open('/terms', '_blank')}>
                    <FileText size={20} className={styles.icon} />
                    <span className={styles.settingText}>Terms of Service</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>

                <Card className={styles.settingItem} interactive onClick={() => window.open('/privacy', '_blank')}>
                    <FileText size={20} className={styles.icon} />
                    <span className={styles.settingText}>Privacy Policy</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>

                <Card className={styles.settingItem} interactive>
                    <FileText size={20} className={styles.icon} />
                    <span className={styles.settingText}>Community Guidelines</span>
                    <ChevronRight size={20} className={styles.chevron} />
                </Card>
            </div>

            {/* App Info */}
            <div className={styles.appInfo}>
                <p>Linkd v1.0.0</p>
                <p>© 2026 Linkd Inc.</p>
            </div>
        </div>
    );
};
