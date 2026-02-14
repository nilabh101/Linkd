import React from 'react';
import { motion, type PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { type Profile } from '../../data/mockData';
import { Card } from '../ui/Card';
import { CheckCircle, MapPin, Briefcase } from 'lucide-react';
import styles from './SwipeCard.module.css';

interface SwipeCardProps {
    profile: Profile;
    onSwipe: (direction: 'left' | 'right') => void;
    style?: React.CSSProperties;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onSwipe, style }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (_event: any, info: PanInfo) => {
        if (info.offset.x > 100) {
            onSwipe('right');
        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
            style={{ x, rotate, opacity, ...style, position: 'absolute', top: 0, width: '100%', height: '100%' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className={styles.cardContainer}
        >
            <Card className={styles.card}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${profile.photos[0]})` }}
                />
                <div className={styles.info}>
                    <div className={styles.header}>
                        <h2>{profile.name}, {profile.age}</h2>
                        {profile.isVerified && <CheckCircle size={20} className={styles.verified} />}
                    </div>

                    <div className={styles.details}>
                        {profile.job && (
                            <div className={styles.detailRow}>
                                <Briefcase size={16} /> <span>{profile.job}</span>
                            </div>
                        )}
                        <div className={styles.detailRow}>
                            <MapPin size={16} /> <span>{profile.distance} km away</span>
                        </div>
                    </div>

                    {profile.prompts.length > 0 && (
                        <div className={styles.prompt}>
                            <p className={styles.promptQ}>{profile.prompts[0].question}</p>
                            <p className={styles.promptA}>{profile.prompts[0].answer}</p>
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
};
