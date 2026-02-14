import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { type OnboardingData } from '../../pages/Onboarding';
import { RELATIONSHIP_GOALS } from '../../data/onboardingOptions';
import { Check } from 'lucide-react';

interface GoalsStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const GoalsStep: React.FC<GoalsStepProps> = ({ data, updateData, onNext, onBack }) => {
    const toggleGoal = (goal: string) => {
        const current = data.goals || [];
        if (current.includes(goal)) {
            updateData({ goals: current.filter(g => g !== goal) });
        } else {
            if (current.length < 2) {
                updateData({ goals: [...current, goal] });
            }
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Relationship Goals</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                What are you looking for right now? (Pick up to 2)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {RELATIONSHIP_GOALS.map(goal => {
                    const isSelected = data.goals?.includes(goal);
                    return (
                        <Card
                            key={goal}
                            className="interactive"
                            onClick={() => toggleGoal(goal)}
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                border: isSelected ? '1px solid var(--color-primary)' : '1px solid transparent',
                                background: isSelected ? 'rgba(212, 175, 55, 0.1)' : undefined
                            }}
                        >
                            <span style={{ fontWeight: 500 }}>{goal}</span>
                            {isSelected && <Check size={20} color="var(--color-primary)" />}
                        </Card>
                    );
                })}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button fullWidth onClick={onNext} disabled={!data.goals || data.goals.length === 0}>Continue</Button>
            </div>
        </div>
    );
};
