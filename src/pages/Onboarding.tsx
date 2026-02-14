import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIVerificationStep } from '../components/onboarding/AIVerificationStep';
import { PromptsStep } from '../components/onboarding/PromptsStep';
import { PhotosStep } from '../components/onboarding/PhotosStep';
import { PreferencesStep } from '../components/onboarding/PreferencesStep';

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);
    const finish = () => navigate('/dashboard');

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--color-background)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                Step {step} of 4
            </div>

            {step === 1 && <AIVerificationStep onNext={nextStep} />}
            {step === 2 && <PhotosStep onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <PromptsStep onNext={nextStep} onBack={prevStep} />}
            {step === 4 && <PreferencesStep onNext={finish} onBack={prevStep} />}
        </div>
    );
};

export default Onboarding;
