import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface PromptsStepProps {
    onNext: () => void;
    onBack: () => void;
}

export const PromptsStep: React.FC<PromptsStepProps> = ({ onNext, onBack }) => {
    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Tell us about yourself</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Pick 3 prompts to help people get to know you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="padded" interactive>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-muted)' }}>Select a prompt</h4>
                        <div style={{ height: '40px', borderBottom: '1px solid var(--color-text-muted)', opacity: 0.3 }}></div>
                    </Card>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button fullWidth onClick={onNext}>Continue</Button>
            </div>
        </div>
    );
};
