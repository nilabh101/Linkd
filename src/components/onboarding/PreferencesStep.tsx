import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface PreferencesStepProps {
    onNext: () => void;
    onBack: () => void;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({ onNext, onBack }) => {
    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Set your Preferences</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Who do you want to meet?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Card className="padded">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Interested in</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button variant="outline" size="sm">Men</Button>
                        <Button variant="primary" size="sm">Women</Button>
                        <Button variant="outline" size="sm">Everyone</Button>
                    </div>
                </Card>

                <Card className="padded">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Age Range</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                        <span>18</span>
                        <span>-</span>
                        <span>35</span>
                    </div>
                    <input type="range" style={{ width: '100%', marginTop: '0.5rem' }} />
                </Card>

                <Card className="padded">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Maximum Distance</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                        <span>10 km</span>
                    </div>
                    <input type="range" style={{ width: '100%', marginTop: '0.5rem' }} />
                </Card>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button fullWidth onClick={onNext}>Complete Profile</Button>
            </div>
        </div>
    );
};
