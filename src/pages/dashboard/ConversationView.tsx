import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { MOCK_CHATS } from '../../data/mockData';
import styles from './ConversationView.module.css';

interface Message {
    id: string;
    sender: 'me' | 'them';
    content: string;
    timestamp: string;
}

export const ConversationView: React.FC = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const chat = MOCK_CHATS.find(c => c.id === chatId);

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'them', content: chat?.lastMessage || 'Hey! How are you?', timestamp: '10:30 AM' },
        { id: '2', sender: 'me', content: 'Hey! I\'m doing great, how about you?', timestamp: '10:32 AM' },
        { id: '3', sender: 'them', content: 'Pretty good! I saw you like hiking. Have any favorite trails?', timestamp: '10:33 AM' }
    ]);

    const [inputText, setInputText] = useState('');
    const [showAICoach, setShowAICoach] = useState(false);
    const [aiSuggestions] = useState([
        "That sounds amazing! I'd love to hear more about your favorite spots.",
        "What's your go-to hiking gear? I'm always looking for recommendations!",
        "Have you been to any challenging trails recently?"
    ]);

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                sender: 'me',
                content: inputText,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const useSuggestion = (suggestion: string) => {
        setInputText(suggestion);
        setShowAICoach(false);
    };

    if (!chat) {
        return <div>Chat not found</div>;
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <button onClick={() => navigate('/dashboard/chat')} className={styles.backButton}>
                    ← Back
                </button>
                <img src={chat.matchImage} alt={chat.matchName} className={styles.avatar} />
                <div className={styles.headerInfo}>
                    <h3>{chat.matchName}</h3>
                    <span className={styles.expires}>Expires in 5 days</span>
                </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={message.sender === 'me' ? styles.messageMe : styles.messageThem}
                    >
                        <div className={styles.bubble}>
                            <p>{message.content}</p>
                            <span className={styles.timestamp}>{message.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Coach Panel */}
            {showAICoach && (
                <div className={styles.aiCoach}>
                    <div className={styles.aiHeader}>
                        <Sparkles size={18} color="#f59e0b" />
                        <span>AI Dating Coach</span>
                    </div>
                    <p className={styles.aiSubtitle}>Here are some conversation starters:</p>
                    <div className={styles.suggestions}>
                        {aiSuggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                className={styles.suggestion}
                                onClick={() => useSuggestion(suggestion)}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className={styles.inputContainer}>
                <button
                    className={styles.aiButton}
                    onClick={() => setShowAICoach(!showAICoach)}
                    title="AI Dating Coach"
                >
                    <Sparkles size={20} color={showAICoach ? '#f59e0b' : '#6b7280'} />
                </button>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.input}
                />
                <Button
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    size="icon"
                    className={styles.sendButton}
                >
                    <Send size={20} />
                </Button>
            </div>
        </div>
    );
};
