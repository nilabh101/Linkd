import React from 'react';
import { Button } from '../ui/Button';
import { type OnboardingData } from '../../pages/Onboarding';
import { INTERESTS } from '../../data/onboardingOptions';
import { clsx } from 'clsx';
import styles from './InterestsStep.module.css';

interface InterestsStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const InterestsStep: React.FC<InterestsStepProps> = ({ data, updateData, onNext, onBack }) => {
    const toggleInterest = (interest: string) => {
        const current = data.interests || [];
        if (current.includes(interest)) {
            updateData({ interests: current.filter(i => i !== interest) });
        } else {
            if (current.length < 10) {
                updateData({ interests: [...current, interest] });
            }
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Your Interests</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Pick up to 10 things you love. ({data.interests?.length || 0}/10)
            </p>

            {/* Mock Spotify/Apple Music Integration */}
            <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Music & Audio</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="ghost" size="sm" style={{ flex: 1, borderColor: '#1DB954', color: '#1DB954' }}>
                        Connect Spotify
                    </Button>
                    <Button variant="ghost" size="sm" style={{ flex: 1, borderColor: '#FA243C', color: '#FA243C' }}>
                        Connect Apple Music
                    </Button>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                    Show your top artists on your profile.
                </p>
            </div>

            <div className={styles.grid}>
                {INTERESTS.map(interest => {
                    const isSelected = data.interests?.includes(interest);
                    return (
                        <button
                            key={interest}
                            className={clsx(styles.pill, isSelected && styles.selected)}
                            onClick={() => toggleInterest(interest)}
                            style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                        >
                            {interest}
                        </button>
                    );
                })}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button fullWidth onClick={onNext} disabled={!data.interests || data.interests.length === 0}>Continue</Button>
            </div>
        </div>
    );
};
