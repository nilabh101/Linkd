import React, { useRef } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Plus, X } from 'lucide-react';
import { type OnboardingData } from '../../pages/Onboarding';

interface PhotosStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const PhotosStep: React.FC<PhotosStepProps> = ({ data, updateData, onNext, onBack }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            updateData({ photos: [...data.photos, imageUrl] });
        }
    };

    const removePhoto = (index: number) => {
        const newPhotos = [...data.photos];
        newPhotos.splice(index, 1);
        updateData({ photos: newPhotos });
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Add your Best Photos</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Add at least 3 photos to continue.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {data.photos.map((photo, index) => (
                    <Card key={index} style={{ aspectRatio: '2/3', position: 'relative', overflow: 'hidden' }}>
                        <img src={photo} alt="User upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                            onClick={() => removePhoto(index)}
                            style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', padding: 4 }}
                        >
                            <X size={14} />
                        </button>
                    </Card>
                ))}

                {data.photos.length < 6 && (
                    <Card
                        className="interactive"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ aspectRatio: '2/3', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}
                    >
                        <Plus color="var(--color-text-muted)" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Card>
                )}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                {/* Validation: require at least 1 photo for demo, 3 for real */}
                <Button fullWidth onClick={onNext} disabled={data.photos.length < 1}>Continue</Button>
            </div>
        </div>
    );
};
