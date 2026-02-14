import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { type OnboardingData } from '../../pages/Onboarding';
import { GENDER_OPTIONS } from '../../data/onboardingOptions';
import { ChevronRight } from 'lucide-react';

interface IdentityStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const IdentityStep: React.FC<IdentityStepProps> = ({ data, updateData, onNext, onBack }) => {
    const [customGender, setCustomGender] = useState('');
    const [isGenderMenuOpen, setIsGenderMenuOpen] = useState(false);

    const handleGenderSelect = (gender: string) => {
        updateData({ gender });
        setIsGenderMenuOpen(false);
    };

    const isValid = data.name && data.gender; // Simplified validation

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Who are you?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Your identity is your power.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                        placeholder="What do we call you?"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }}
                    />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Gender</label>
                    {!isGenderMenuOpen ? (
                        <div
                            onClick={() => setIsGenderMenuOpen(true)}
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: data.gender ? 'white' : 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            {data.gender || 'Select Gender'}
                            <ChevronRight size={16} />
                        </div>
                    ) : (
                        <Card className="padded" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {GENDER_OPTIONS.map(g => (
                                <div
                                    key={g}
                                    onClick={() => {
                                        if (g === 'Other') {
                                            setCustomGender('');
                                            // Don't close menu, show input
                                        } else {
                                            handleGenderSelect(g);
                                        }
                                    }}
                                    style={{ padding: '0.5rem 0', cursor: 'pointer', color: data.gender === g ? 'var(--color-primary)' : 'white' }}
                                >
                                    {g}
                                </div>
                            ))}

                            {/* Always show custom input if 'Other' is selected or active */}
                            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Specify your gender..."
                                    value={customGender}
                                    onChange={(e) => setCustomGender(e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', background: 'transparent', border: '1px solid var(--color-text-muted)', borderRadius: '4px', color: 'white' }}
                                />
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleGenderSelect(customGender)}
                                    disabled={!customGender}
                                    style={{ marginTop: '0.5rem', width: '100%' }}
                                >
                                    Confirm "{customGender}"
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button fullWidth onClick={onNext} disabled={!isValid}>Continue</Button>
            </div>
        </div>
    );
};
