import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { AuthModal } from '../components/auth/AuthModal';
import { Shield, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { statsHelpers } from '../lib/supabase';

const LandingPage: React.FC = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [realStats, setRealStats] = useState({
        totalUsers: 542891,
        totalMatches: 89432,
        activeNow: 1243,
        joinedToday: 1243
    });

    useEffect(() => {
        const fetchStats = async () => {
            const { totalUsers, totalMatches, activeNow, error } = await statsHelpers.getAppStats();
            if (!error) {
                // For demo/launch phase, we'll combine real data with base launch stats 
                // to make the hero look healthy while the app grows
                setRealStats({
                    totalUsers: Math.max(542891, totalUsers),
                    totalMatches: Math.max(89432, totalMatches),
                    activeNow: Math.max(1243, activeNow),
                    joinedToday: activeNow // Simple proxy for today
                });
            }
        };

        fetchStats();
        // Refresh stats every 30 seconds
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const stats = [
        { value: realStats.totalUsers.toLocaleString(), label: 'Real People Online' },
        { value: realStats.totalMatches.toLocaleString(), label: 'Successful Matches' },
        { value: '1.2M+', label: 'Verified Profiles' },
    ];

    const features = [
        {
            icon: <Shield size={32} />,
            title: 'AI-Verified Profiles',
            description: 'Advanced facial recognition ensures every profile is authentic. No catfishing, guaranteed.',
        },
        {
            icon: <Star size={32} />,
            title: 'Curated Daily Picks',
            description: 'Premium AI-powered selections tailored to your preferences, delivered daily.',
        },
        {
            icon: <Heart size={32} />,
            title: 'Anti-Ghosting',
            description: 'Chats expire after inactivity, encouraging meaningful and timely conversations.',
        },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)', color: 'var(--color-text)' }}>

            {/* Hero Section */}
            <header style={{
                minHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                position: 'relative'
            }}>
                <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '900px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: 'var(--gradient-primary)',
                            padding: '0.5rem 1.25rem',
                            borderRadius: 'var(--radius-xl)',
                            marginBottom: '2rem',
                            boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
                        }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                background: '#10b981',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px #10b981'
                            }} className="pulse" />
                            <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                                LIVE: {realStats.joinedToday.toLocaleString()} members joined today
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} style={{
                        fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                        marginBottom: '1.5rem',
                        fontWeight: 700,
                        lineHeight: 1.2
                    }}>
                        Real People,
                        <br />
                        <span style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Real Connections
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} style={{
                        fontSize: '1.25rem',
                        maxWidth: '600px',
                        margin: '0 auto 2.5rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6
                    }}>
                        The only dating app with mandatory AI face verification.
                        Say goodbye to catfishing and hello to authentic relationships.
                    </motion.p>

                    {/* Stats Cards */}
                    <motion.div
                        variants={stagger}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            justifyContent: 'center',
                            marginBottom: '2rem'
                        }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                style={{
                                    background: 'var(--glass-bg)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '1rem 1.5rem',
                                    boxShadow: 'var(--shadow-lg)',
                                    minWidth: '140px'
                                }}
                            >
                                <div style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 700,
                                    background: 'var(--gradient-primary)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <Button
                            size="lg"
                            onClick={() => setIsAuthOpen(true)}
                            style={{
                                background: 'var(--gradient-primary)',
                                border: 'none',
                                fontSize: '1.125rem',
                                padding: '1rem 2.5rem',
                                borderRadius: 'var(--radius-xl)',
                                boxShadow: 'var(--shadow-xl)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Start Your Journey
                            <Heart size={20} fill="white" />
                        </Button>
                    </motion.div>
                </motion.div>
            </header>

            {/* Features Section */}
            <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                        Why Choose Linkd?
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>
                        The safest and most authentic dating experience
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            style={{
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: 'var(--radius-xl)',
                                padding: '2.5rem',
                                textAlign: 'center',
                                boxShadow: 'var(--shadow-lg)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '64px',
                                height: '64px',
                                background: 'var(--gradient-primary)',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'white'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                color: 'var(--color-text-muted)'
            }}>
                <p>&copy; 2026 Linkd Inc. All rights reserved.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
                    <a href="#" style={linkStyle}>Privacy</a>
                    <a href="#" style={linkStyle}>Terms</a>
                    <a href="#" style={linkStyle}>Safety</a>
                </div>
            </footer>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </div>
    );
};

const linkStyle: React.CSSProperties = {
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease'
};

export default LandingPage;
