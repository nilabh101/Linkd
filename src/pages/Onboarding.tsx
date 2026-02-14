import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIVerificationStep } from '../components/onboarding/AIVerificationStep';
import { IdentityStep } from '../components/onboarding/IdentityStep';
import { PromptsStep } from '../components/onboarding/PromptsStep';
import { PhotosStep } from '../components/onboarding/PhotosStep';
import { InterestsStep } from '../components/onboarding/InterestsStep';
import { GoalsStep } from '../components/onboarding/GoalsStep';
import { PreferencesStep } from '../components/onboarding/PreferencesStep';
import { AnimatePresence, motion } from 'framer-motion';

export interface OnboardingData {
    isVerified: boolean;
    name: string;
    birthDate: string;
    gender: string;
    showGender: boolean;
    orientation: string[];
    photos: string[];
    prompts: { question: string; answer: string }[];
    interests: string[];
    goals: string[];
    preferences: {
        ageRange: [number, number];
        distance: number;
        interestedIn: string[];
        genderPreference?: string[];
    };
}

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<OnboardingData>({
        isVerified: false,
        name: '',
        birthDate: '',
        gender: '',
        showGender: true,
        orientation: [],
        photos: [],
        prompts: [],
        interests: [],
        goals: [],
        preferences: {
            ageRange: [18, 35],
            distance: 25,
            interestedIn: ['Everyone']
        }
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);
    const finish = () => {
        console.log('Final Data:', data);
        navigate('/dashboard');
    };

    const updateData = (partial: Partial<OnboardingData>) => {
        setData(prev => ({ ...prev, ...partial }));
    };

    const steps = [
        { component: IdentityStep, props: { data, updateData, onNext: nextStep, onBack: prevStep } },
        { component: PhotosStep, props: { data, updateData, onNext: nextStep, onBack: prevStep } },
        { component: AIVerificationStep, props: { onNext: () => { updateData({ isVerified: true }); nextStep(); }, data, updateData, onBack: prevStep as () => void } },
        { component: PromptsStep, props: { data, updateData, onNext: nextStep, onBack: prevStep } },
        { component: InterestsStep, props: { data, updateData, onNext: nextStep, onBack: prevStep } },
        { component: GoalsStep, props: { data, updateData, onNext: nextStep, onBack: prevStep } },
        { component: PreferencesStep, props: { data, updateData, onNext: finish, onBack: prevStep } }
    ];

    const CurrentStep = steps[step - 1]?.component;

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--color-background)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                Step {step} of {steps.length}
            </div>

            <AnimatePresence mode="wait">
                {CurrentStep && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {React.createElement(CurrentStep, steps[step - 1].props)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Onboarding;
