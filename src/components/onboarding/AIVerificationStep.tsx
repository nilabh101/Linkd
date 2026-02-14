import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Camera, CheckCircle, Loader2 } from 'lucide-react';

interface AIVerificationStepProps {
    onNext: () => void;
}

export const AIVerificationStep: React.FC<AIVerificationStepProps> = ({ onNext }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = () => {
        setIsAnalyzing(true);
        // Mock analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setIsVerified(true);
        }, 2000);
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <h2>AI Verification</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                We use AI to ensure everyone on Linkd is real. Please take a selfie to verify.
            </p>

            <Card className="padded" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                {isVerified ? (
                    <>
                        <CheckCircle size={64} color="var(--color-success)" />
                        <h3>Verified!</h3>
                        <p>You're good to go.</p>
                    </>
                ) : isAnalyzing ? (
                    <>
                        <Loader2 size={48} className="spin" />
                        <p>Analyzing biometrics...</p>
                    </>
                ) : (
                    <>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Camera size={48} />
                        </div>
                        <p className="text-sm text-muted">Position your face in the circle</p>
                    </>
                )}
            </Card>

            <div style={{ marginTop: '2rem' }}>
                {!isVerified ? (
                    <Button fullWidth onClick={handleVerify} disabled={isAnalyzing}>
                        {isAnalyzing ? 'Verifying...' : 'Take Photo'}
                    </Button>
                ) : (
                    <Button fullWidth onClick={onNext}>
                        Continue
                    </Button>
                )}
            </div>
        </div>
    );
};
