import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { type OnboardingData } from '../../pages/Onboarding';

interface PreferencesStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({ data, updateData, onNext, onBack }) => {
    const [ageRange, setAgeRange] = useState<[number, number]>(data.preferences.ageRange);
    const [genderPreference, setGenderPreference] = useState<string[]>(
        data.preferences.genderPreference || []
    );

    const toggleGender = (gender: string) => {
        if (genderPreference.includes(gender)) {
            setGenderPreference(genderPreference.filter(g => g !== gender));
        } else {
            setGenderPreference([...genderPreference, gender]);
        }
    };

    const handleNext = () => {
        updateData({
            preferences: {
                ...data.preferences,
                ageRange,
                genderPreference
            }
        });
        onNext();
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Final Preferences</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Who do you want to see?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Gender Preference */}
                <div>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
                        I want to date:
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {['Man', 'Woman', 'Non-binary', 'Everyone'].map((gender) => (
                            <label
                                key={gender}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: genderPreference.includes(gender)
                                        ? '2px solid var(--color-primary)'
                                        : '2px solid rgba(255,255,255,0.1)',
                                    background: genderPreference.includes(gender)
                                        ? 'rgba(245, 158, 11, 0.1)'
                                        : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={() => toggleGender(gender)}
                            >
                                <input
                                    type="checkbox"
                                    checked={genderPreference.includes(gender)}
                                    onChange={() => toggleGender(gender)}
                                    style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                                />
                                <span style={{ fontSize: '1rem' }}>{gender}</span>
                            </label>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
                        Select one or more. Choose "Everyone" to see all genders.
                    </p>
                </div>

                {/* Age Range */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <label>Age Range</label>
                        <span style={{ color: 'var(--color-primary)' }}>{ageRange[0]} - {ageRange[1]}</span>
                    </div>
                    {/* Mock Range Slider */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <input
                            type="range"
                            min="18"
                            max="100"
                            value={ageRange[1]}
                            onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                        />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                        Move slider to adjust max age. (Min age fixed at 18 for demo)
                    </p>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <Button variant="ghost" onClick={onBack}>Back</Button>
                    <Button fullWidth onClick={handleNext} disabled={genderPreference.length === 0}>
                        Complete Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};
