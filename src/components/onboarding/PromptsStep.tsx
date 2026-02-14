import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { type OnboardingData } from '../../pages/Onboarding';
import { ONBOARDING_PROMPTS } from '../../data/onboardingOptions';
import { Plus, X, Edit2 } from 'lucide-react';

interface PromptsStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const PromptsStep: React.FC<PromptsStepProps> = ({ data, updateData, onNext, onBack }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [selectedPromptQuestion, setSelectedPromptQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handlePromptClick = (index: number) => {
        setEditingIndex(index);
        if (data.prompts[index]) {
            setSelectedPromptQuestion(data.prompts[index].question);
            setAnswer(data.prompts[index].answer);
        } else {
            setSelectedPromptQuestion('');
            setAnswer('');
        }
        setIsModalOpen(true);
    };

    const savePrompt = () => {
        if (editingIndex !== null) {
            const newPrompts = [...data.prompts];
            newPrompts[editingIndex] = { question: selectedPromptQuestion, answer };
            updateData({ prompts: newPrompts });
            setIsModalOpen(false);
        }
    };

    const removePrompt = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        const newPrompts = [...data.prompts];
        newPrompts.splice(index, 1);
        updateData({ prompts: newPrompts });
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Tell us about yourself</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Pick 3 prompts to help people get to know you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[0, 1, 2].map((i) => (
                    <Card key={i} className="padded interactive" onClick={() => handlePromptClick(i)}>
                        {data.prompts[i] ? (
                            <div style={{ position: 'relative' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{data.prompts[i].question}</h4>
                                <p style={{ margin: 0, fontSize: '1.1rem' }}>{data.prompts[i].answer}</p>
                                <button
                                    onClick={(e) => removePrompt(e, i)}
                                    style={{ position: 'absolute', top: -5, right: -5, background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.5 }}>
                                <Plus size={20} />
                                <span>Select a prompt</span>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button fullWidth onClick={onNext} disabled={data.prompts.length < 3}>Continue</Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select a Prompt">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto' }}>
                    {!selectedPromptQuestion ? (
                        ONBOARDING_PROMPTS.filter(p => !data.prompts.find(dp => dp.question === p)).map(prompt => (
                            <div
                                key={prompt}
                                onClick={() => setSelectedPromptQuestion(prompt)}
                                style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                            >
                                {prompt}
                            </div>
                        ))
                    ) : (
                        <div style={{ animation: 'fadeIn 0.2s' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => setSelectedPromptQuestion('')}>
                                <Edit2 size={14} color="var(--color-text-muted)" />
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Change Prompt</span>
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>{selectedPromptQuestion}</h3>
                            <textarea
                                autoFocus
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Type your answer..."
                                rows={4}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem', color: 'white', resize: 'none', fontFamily: 'inherit' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <Button onClick={savePrompt} disabled={!answer.trim()}>Save Answer</Button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};
