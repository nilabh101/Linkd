import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Eye, Settings, Crown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import styles from './ProfileView.module.css';

// Mock current user data - will be replaced with real Supabase data
const mockUserProfile = {
    name: 'You',
    age: 25,
    photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
    ],
    bio: 'Adventure seeker | Coffee enthusiast | Always planning the next trip ✈️',
    prompts: [
        { question: "My simple pleasure is...", answer: "A perfect cup of coffee on a Sunday morning" },
        { question: "I go crazy for...", answer: "Live music and spontaneous road trips" },
        { question: "Together we could...", answer: "Explore new cities and try every local food spot" }
    ],
    interests: ['Travel', 'Coffee', 'Hiking', 'Photography', 'Live Music', 'Foodie', 'Dogs', 'Adventure'],
    job: 'Product Designer',
    verified: true
};

export const ProfileView: React.FC = () => {
    const navigate = useNavigate();
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % mockUserProfile.photos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) =>
            prev === 0 ? mockUserProfile.photos.length - 1 : prev - 1
        );
    };

    if (showPreview) {
        // Profile Preview Mode - How others see you
        return (
            <div className={styles.previewContainer}>
                <div className={styles.previewHeader}>
                    <Button variant="ghost" onClick={() => setShowPreview(false)}>
                        ← Back
                    </Button>
                    <h3>Profile Preview</h3>
                    <div style={{ width: '80px' }} /> {/* Spacer */}
                </div>

                {/* Mimics SwipeCard design */}
                <Card className={styles.previewCard}>
                    {/* Photos Carousel */}
                    <div className={styles.photoContainer}>
                        <img
                            src={mockUserProfile.photos[currentPhotoIndex]}
                            alt={`${mockUserProfile.name}`}
                            className={styles.photo}
                        />
                        <div className={styles.photoIndicators}>
                            {mockUserProfile.photos.map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.indicator} ${index === currentPhotoIndex ? styles.active : ''}`}
                                />
                            ))}
                        </div>
                        <button className={styles.photoNavLeft} onClick={prevPhoto}>‹</button>
                        <button className={styles.photoNavRight} onClick={nextPhoto}>›</button>
                    </div>

                    {/* Profile Info */}
                    <div className={styles.info}>
                        <div className={styles.nameRow}>
                            <h2>{mockUserProfile.name}, {mockUserProfile.age}</h2>
                            {mockUserProfile.verified && <span className={styles.verified}>✓</span>}
                        </div>
                        <p className={styles.job}>{mockUserProfile.job}</p>
                        <p className={styles.bio}>{mockUserProfile.bio}</p>

                        {/* Prompts */}
                        <div className={styles.prompts}>
                            {mockUserProfile.prompts.map((prompt, index) => (
                                <div key={index} className={styles.prompt}>
                                    <p className={styles.question}>{prompt.question}</p>
                                    <p className={styles.answer}>{prompt.answer}</p>
                                </div>
                            ))}
                        </div>

                        {/* Interests */}
                        <div className={styles.interests}>
                            <h4>Interests</h4>
                            <div className={styles.tags}>
                                {mockUserProfile.interests.map((interest, index) => (
                                    <span key={index} className={styles.tag}>{interest}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // Regular Profile View
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>My Profile</h2>

            {/* Profile Photo */}
            <div className={styles.profilePhotoSection}>
                <img
                    src={mockUserProfile.photos[0]}
                    alt="Profile"
                    className={styles.profilePhoto}
                />
                {mockUserProfile.verified && (
                    <div className={styles.verifiedBadge}>✓ Verified</div>
                )}
            </div>

            {/* Profile Info */}
            <div className={styles.profileInfo}>
                <h3>{mockUserProfile.name}, {mockUserProfile.age}</h3>
                <p>{mockUserProfile.job}</p>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
                <Button
                    variant="primary"
                    onClick={() => setShowPreview(true)}
                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                    <Eye size={18} />
                    Preview Profile
                </Button>
                <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard/profile/edit')}
                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                    <Edit size={18} />
                    Edit Profile
                </Button>
            </div>

            {/* Premium CTA */}
            <Card className={styles.premiumCTA} onClick={() => navigate('/dashboard/premium')}>
                <div className={styles.premiumHeader}>
                    <Crown size={24} color="#f59e0b" />
                    <h4>Get Linkd Black</h4>
                </div>
                <p>Unlock unlimited likes, priority discovery, and more!</p>
                <div className={styles.ctaBadge}>Upgrade Now</div>
            </Card>

            {/* Stats */}
            <div className={styles.stats}>
                <Card className={styles.statCard}>
                    <h4>30</h4>
                    <p>Likes</p>
                </Card>
                <Card className={styles.statCard}>
                    <h4>12</h4>
                    <p>Matches</p>
                </Card>
                <Card className={styles.statCard}>
                    <h4>95%</h4>
                    <p>Profile Score</p>
                </Card>
            </div>

            {/* Settings Button */}
            <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/dashboard/settings')}
                style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}
            >
                <Settings size={18} />
                Settings
            </Button>
        </div>
    );
};
