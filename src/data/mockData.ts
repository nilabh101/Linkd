export interface Profile {
    id: string;
    name: string;
    age: number;
    bio: string;
    photos: string[];
    job: string;
    distance: number;
    prompts: { question: string; answer: string }[];
    isVerified: boolean;
}

export const MOCK_PROFILES: Profile[] = [
    {
        id: '1',
        name: 'Sarah',
        age: 24,
        bio: 'Coffee addict and dog lover. 🐕',
        photos: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80'
        ],
        job: 'Designer',
        distance: 3,
        prompts: [
            { question: 'My simple pleasure', answer: 'Morning coffee ☕️' },
            { question: 'I go crazy for', answer: 'Spicy food 🌶️' }
        ],
        isVerified: true
    },
    {
        id: '2',
        name: 'Jessica',
        age: 26,
        bio: 'Travel enthusiast | Photographer 📸',
        photos: [
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80'
        ],
        job: 'Photographer',
        distance: 8,
        prompts: [
            { question: 'Best travel story', answer: 'Got lost in Tokyo, found the best ramen ever.' }
        ],
        isVerified: true
    },
    {
        id: '3',
        name: 'Emily',
        age: 23,
        bio: 'Just looking for someone to binge Netflix with.',
        photos: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
        ],
        job: 'Student',
        distance: 12,
        prompts: [],
        isVerified: false
    },
    {
        id: '4',
        name: 'Michael',
        age: 27,
        bio: 'Tech entrepreneur. Always building.',
        photos: [
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80'
        ],
        job: 'Founder',
        distance: 5,
        prompts: [
            { question: 'I geek out on', answer: 'AI and Robotics' }
        ],
        isVerified: true
    }
];

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isRead: boolean;
}

export interface Chat {
    id: string;
    matchId: string;
    matchName: string;
    matchImage: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    messages: Message[];
    expiresIn: string; // ISO date
}

export const MOCK_CHATS: Chat[] = [
    {
        id: 'c1',
        matchId: '2',
        matchName: 'Jessica',
        matchImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
        lastMessage: 'OMG I love Tokyo too! 🍜',
        timestamp: '2 min ago',
        unreadCount: 1,
        expiresIn: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        messages: [
            { id: 'm1', senderId: 'me', text: 'Hey! I saw you went to Japan?', timestamp: '10 min ago', isRead: true },
            { id: 'm2', senderId: '2', text: 'OMG I love Tokyo too! 🍜', timestamp: '2 min ago', isRead: false }
        ]
    },
    {
        id: 'c2',
        matchId: '4',
        matchName: 'Michael',
        matchImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
        lastMessage: 'Sure, lets do coffee.',
        timestamp: '1 day ago',
        unreadCount: 0,
        expiresIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        messages: []
    }
];
