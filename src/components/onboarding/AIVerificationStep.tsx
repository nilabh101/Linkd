import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Camera, CheckCircle, Loader2 } from 'lucide-react';

interface AIVerificationStepProps {
    onNext: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AIVerificationStep: React.FC<AIVerificationStepProps> = ({ onNext, data }) => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = () => {
        if (!data?.photos || data.photos.length === 0) {
            setError('Please upload photos first to verify.');
            return;
        }

        setError('');
        setIsVerifying(true);

        // Mock analysis
        setTimeout(() => {
            setIsVerifying(false);
            setIsSuccess(true);
        }, 3000);
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <h2>AI Verification</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                We use AI to ensure everyone on Linkd is real.
                {data?.photos?.length > 0 ? " We'll compare your selfie with your uploaded photos." : " Please upload photos first."}
            </p>

            <Card className="padded" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                {isSuccess ? (
                    <>
                        <CheckCircle size={64} color="var(--color-success)" />
                        <h3>Verified!</h3>
                        <p>Face matched with profile photos.</p>
                    </>
                ) : isVerifying ? (
                    <>
                        <Loader2 size={48} className="spin" />
                        <p>Scanning face...</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Matching against {data.photos.length} photos...</p>
                    </>
                ) : (
                    <>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Camera size={48} />
                        </div>
                        <p className="text-sm text-muted">Position your face in the circle</p>
                        {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}
                    </>
                )}
            </Card>

            <div style={{ marginTop: '2rem' }}>
                {!isSuccess ? (
                    <Button fullWidth onClick={handleVerify} disabled={isVerifying || !data?.photos?.length}>
                        {isVerifying ? 'Verifying...' : 'Take Scan'}
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
