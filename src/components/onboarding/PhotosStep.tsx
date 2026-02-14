import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Plus } from 'lucide-react';

interface PhotosStepProps {
    onNext: () => void;
    onBack: () => void;
}

export const PhotosStep: React.FC<PhotosStepProps> = ({ onNext, onBack }) => {
    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Add your Best Photos</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Add at least 3 photos to continue.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="interactive" style={{ aspectRatio: '2/3', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>
                        <Plus color="var(--color-text-muted)" />
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
