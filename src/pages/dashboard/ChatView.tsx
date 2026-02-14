import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { MOCK_CHATS } from '../../data/mockData';
import styles from './ChatView.module.css';

export const ChatView: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Matches & Chats</h2>

            <div className={styles.matchRow}>
                <div className={styles.newMatch}>
                    <div className={styles.matchAvatar} style={{ border: '2px solid var(--color-active)' }}>
                        <div className={styles.blur} />
                    </div>
                    <span className={styles.matchName}>You?</span>
                </div>
                {MOCK_CHATS.map(chat => (
                    <div key={chat.id} className={styles.newMatch}>
                        <img src={chat.matchImage} alt={chat.matchName} className={styles.matchAvatar} />
                        <span className={styles.matchName}>{chat.matchName}</span>
                    </div>
                ))}
            </div>

            <div className={styles.chatList}>
                <h3 className={styles.sectionTitle}>Messages</h3>
                {MOCK_CHATS.map(chat => (
                    <Card
                        key={chat.id}
                        className={styles.chatItem}
                        interactive
                        onClick={() => navigate(`/dashboard/chat/${chat.id}`)}
                    >
                        <img src={chat.matchImage} alt={chat.matchName} className={styles.chatAvatar} />
                        <div className={styles.chatContent}>
                            <div className={styles.chatHeader}>
                                <span className={styles.name}>{chat.matchName}</span>
                                <span className={styles.time}>{chat.timestamp}</span>
                            </div>
                            <p className={styles.message}>
                                {chat.lastMessage}
                                {chat.unreadCount > 0 && <span className={styles.dot} />}
                            </p>
                            <div className={styles.expires}>
                                Expires in 5 days
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
