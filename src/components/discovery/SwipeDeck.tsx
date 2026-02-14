
import React, { useState } from 'react';
import { MOCK_PROFILES, type Profile } from '../../data/mockData';
import { SwipeCard } from './SwipeCard';
import { Button } from '../ui/Button';
import { X, Heart, Star } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const SwipeDeck: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
    const [_lastDirection, setLastDirection] = useState<string>('');

    const handleSwipe = (direction: 'left' | 'right', profileId: string) => {
        setLastDirection(direction);
        setProfiles((current) => current.filter((p) => p.id !== profileId));
        console.log(`Swiped ${direction} on ${profileId} `);

        // Mock match logic
        if (direction === 'right' && Math.random() > 0.7) {
            // alert("It's a Match!"); 
            // In real app, show match modal
        }
    };

    const swipe = (direction: 'left' | 'right') => {
        if (profiles.length > 0) {
            handleSwipe(direction, profiles[0].id);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '400px', margin: '0 auto', position: 'relative' }}>
            <div style={{ flex: 1, position: 'relative', margin: '1rem' }}>
                <AnimatePresence>
                    {profiles.map((profile, index) => {
                        // Only render the top 2 cards for performance
                        if (index > 1) return null;

                        return (
                            <SwipeCard
                                key={profile.id}
                                profile={profile}
                                onSwipe={(dir) => handleSwipe(dir, profile.id)}
                                style={{ zIndex: profiles.length - index }}
                            />
                        );
                    })}
                </AnimatePresence>

                {profiles.length === 0 && (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                        <p>No more profiles nearby.</p>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '1rem', paddingBottom: '2rem' }}>
                <Button
                    className="round-btn"
                    onClick={() => swipe('left')}
                    style={{ borderRadius: '50%', width: '60px', height: '60px', border: '2px solid var(--color-error)', color: 'var(--color-error)', background: 'transparent' }}
                >
                    <X size={32} />
                </Button>
                <Button
                    className="round-btn"
                    style={{ borderRadius: '50%', width: '48px', height: '48px', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', background: 'transparent' }}
                >
                    <Star size={24} />
                </Button>
                <Button
                    className="round-btn"
                    onClick={() => swipe('right')}
                    style={{ borderRadius: '50%', width: '60px', height: '60px', border: '2px solid var(--color-success)', color: 'var(--color-success)', background: 'transparent' }}
                >
                    <Heart size={32} fill="var(--color-success)" fillOpacity={0.1} />
                </Button>
            </div>
        </div>
    );
};
