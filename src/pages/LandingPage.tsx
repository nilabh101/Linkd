import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import classes from './LandingPage.module.css';
import { AuthModal } from '../components/auth/AuthModal';

const LandingPage: React.FC = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <div className={classes.container}>
            <nav className={classes.nav}>
                <div className={classes.logo}>Linkd</div>
                <Button variant="ghost" onClick={() => setIsAuthModalOpen(true)}>Login</Button>
            </nav>

            <main className={classes.hero}>
                <h1 className={classes.title}>
                    Dating with <span className={classes.highlight}>Trust</span>.
                    <br />
                    No Catfish. Just <span className={classes.highlight}>Real Connections</span>.
                </h1>
                <p className={classes.subtitle}>
                    The only dating app with AI-powered verification and curated daily picks.
                    Stop scrolling, start connecting.
                </p>
                <div className={classes.actions}>
                    <Button size="lg" onClick={() => setIsAuthModalOpen(true)}>Get Started</Button>
                </div>
            </main>

            <div className={classes.features}>
                <Card className={classes.featureCard}>
                    <h3>AI Verified</h3>
                    <p>No more fakes. Every profile is verified.</p>
                </Card>
                <Card className={classes.featureCard}>
                    <h3>Daily Curated</h3>
                    <p>Quality over quantity. 2 picks per day.</p>
                </Card>
                <Card className={classes.featureCard}>
                    <h3>Anti-Ghosting</h3>
                    <p>Chats expire in 7 days to keep it moving.</p>
                </Card>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </div>
    );
};

export default LandingPage;
