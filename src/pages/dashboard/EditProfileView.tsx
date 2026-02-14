import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { INTERESTS } from '../../data/onboardingOptions';
import styles from './EditProfileView.module.css';

export const EditProfileView: React.FC = () => {
    const navigate = useNavigate();

    // Mock current user data - will be replaced with real Supabase data
    const [name, setName] = useState('Alex');
    const [age, setAge] = useState(25);
    const [bio, setBio] = useState('Adventure seeker | Coffee enthusiast | Always planning the next trip ✈️');
    const [job, setJob] = useState('Product Designer');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([
        'Travel', 'Coffee', 'Hiking', 'Photography', 'Live Music', 'Foodie', 'Dogs', 'Adventure'
    ]);
    const [prompts, setPrompts] = useState([
        { question: "My simple pleasure is...", answer: "A perfect cup of coffee on a Sunday morning" },
        { question: "I go crazy for...", answer: "Live music and spontaneous road trips" },
        { question: "Together we could...", answer: "Explore new cities and try every local food spot" }
    ]);

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else if (selectedInterests.length < 10) {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const updatePromptAnswer = (index: number, newAnswer: string) => {
        const updatedPrompts = [...prompts];
        updatedPrompts[index].answer = newAnswer;
        setPrompts(updatedPrompts);
    };

    const handleSave = async () => {
        // TODO: Save to Supabase
        console.log('Saving profile:', { name, age, bio, job, selectedInterests, prompts });
        alert('Profile saved successfully!');
        navigate('/dashboard/profile');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button variant="ghost" onClick={() => navigate('/dashboard/profile')}>
                    ← Back
                </Button>
                <h2>Edit Profile</h2>
                <Button onClick={handleSave} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Save size={18} />
                    Save
                </Button>
            </div>

            {/* Photos Section */}
            <Card className={styles.section}>
                <h3>Photos</h3>
                <div className={styles.photoGrid}>
                    <div className={styles.photoBox}>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Photo 1" />
                        <button className={styles.changePhoto}>
                            <Camera size={20} />
                        </button>
                    </div>
                    <div className={styles.photoBox}>
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" alt="Photo 2" />
                        <button className={styles.changePhoto}>
                            <Camera size={20} />
                        </button>
                    </div>
                    <div className={styles.photoBox}>
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400" alt="Photo 3" />
                        <button className={styles.changePhoto}>
                            <Camera size={20} />
                        </button>
                    </div>
                    <div className={styles.photoBox + ' ' + styles.addPhoto}>
                        <Camera size={32} />
                        <span>Add Photo</span>
                    </div>
                </div>
            </Card>

            {/* Basic Info */}
            <Card className={styles.section}>
                <h3>Basic Info</h3>
                <div className={styles.inputGroup}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value))}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Job Title</label>
                    <input
                        type="text"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className={styles.textarea}
                        rows={3}
                        maxLength={150}
                    />
                    <span className={styles.charCount}>{bio.length}/150</span>
                </div>
            </Card>

            {/* Prompts */}
            <Card className={styles.section}>
                <h3>Prompts</h3>
                {prompts.map((prompt, index) => (
                    <div key={index} className={styles.promptEdit}>
                        <label>{prompt.question}</label>
                        <textarea
                            value={prompt.answer}
                            onChange={(e) => updatePromptAnswer(index, e.target.value)}
                            className={styles.textarea}
                            rows={2}
                            maxLength={100}
                        />
                    </div>
                ))}
            </Card>

            {/* Interests */}
            <Card className={styles.section}>
                <h3>Interests ({selectedInterests.length}/10)</h3>
                <div className={styles.interestGrid}>
                    {INTERESTS.slice(0, 50).map((interest) => (
                        <button
                            key={interest}
                            className={`${styles.interestTag} ${selectedInterests.includes(interest) ? styles.selected : ''}`}
                            onClick={() => toggleInterest(interest)}
                            disabled={!selectedInterests.includes(interest) && selectedInterests.length >= 10}
                        >
                            {interest}
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    );
};
