
import React, { useState } from 'react';
import { MOCK_PROFILES, type Profile } from '../../data/mockData';
import { SwipeCard } from './SwipeCard';
import { Button } from '../ui/Button';
import { X, Heart, Star, RotateCcw } from 'lucide-react';

export const SwipeDeck: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
    const [_lastDirection, setLastDirection] = useState<string>('');
    const [history, setHistory] = useState<Profile[]>([]);

    const handleSwipe = (direction: 'left' | 'right', profileId: string) => {
        setLastDirection(direction);

        const swipedProfile = profiles.find(p => p.id === profileId);
        if (swipedProfile) {
            setHistory(prev => [swipedProfile, ...prev].slice(0, 5)); // Keep last 5
        }

        setTimeout(() => {
            setProfiles(prev => prev.filter(p => p.id !== profileId));
        }, 300);
    };

    const handleRewind = () => {
        if (history.length > 0) {
            const lastProfile = history[0];
            setProfiles(prev => [lastProfile, ...prev]);
            setHistory(prev => prev.slice(1));
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '450px', height: '600px', margin: '0 auto' }}>
            {profiles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                    <h3>No more profiles</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Check back later for more matches!</p>
                </div>
            ) : (
                <>
                    {profiles.map((profile, index) => (
                        <SwipeCard
                            key={profile.id}
                            profile={profile}
                            onSwipe={(direction) => handleSwipe(direction, profile.id)}
                            style={{
                                zIndex: profiles.length - index,
                                scale: 1 - index * 0.05,
                                opacity: index < 3 ? 1 : 0,
                                pointerEvents: index === 0 ? 'auto' : 'none'
                            }}
                        />
                    ))}
                </>
            )}

            {/* Action Buttons */}
            <div style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRewind}
                    disabled={history.length === 0}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'var(--color-surface)',
                        border: '2px solid rgba(255,255,255,0.1)',
                        opacity: history.length === 0 ? 0.3 : 1
                    }}
                    aria-label="Rewind"
                >
                    <RotateCcw size={20} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => profiles.length > 0 && handleSwipe('left', profiles[0].id)}
                    disabled={profiles.length === 0}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--color-surface)',
                        border: '2px solid #f87171'
                    }}
                    aria-label="Pass"
                >
                    <X size={24} color="#f87171" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => profiles.length > 0 && handleSwipe('right', profiles[0].id)}
                    disabled={profiles.length === 0}
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                        border: 'none'
                    }}
                    aria-label="Like"
                >
                    <Heart size={28} color="white" fill="white" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'var(--color-surface)',
                        border: '2px solid rgba(255,255,255,0.1)'
                    }}
                    aria-label="Super Like"
                >
                    <Star size={20} color="var(--color-accent)" />
                </Button>
            </div>
        </div>
    );
};
