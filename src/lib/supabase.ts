// Supabase Configuration
// Create a .env.local file with your Supabase credentials:
// VITE_SUPABASE_URL=your-project-url
// VITE_SUPABASE_ANON_KEY=your-anon-key

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Profile {
    id: string;
    user_id: string;
    name: string;
    age: number;
    gender: string;
    bio: string;
    photos: string[];
    interests: string[];
    prompts: { question: string; answer: string }[];
    job: string;
    verified: boolean;
    premium: boolean;
    location: { lat: number; lng: number };
    preferences: {
        ageRange: [number, number];
        distance: number;
        genderPreference: string[];
    };
    created_at: string;
    updated_at: string;
}

export interface Match {
    id: string;
    user1_id: string;
    user2_id: string;
    created_at: string;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    type: 'text' | 'photo' | 'video' | 'voice';
    media_url?: string;
    created_at: string;
    read: boolean;
}

export interface Conversation {
    id: string;
    user1_id: string;
    user2_id: string;
    last_message?: Message;
    last_activity: string;
    created_at: string;
}

// Auth helper functions
export const authHelpers = {
    signUp: async (email: string, password: string, name: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });
        return { data, error };
    },

    signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    signInWithGoogle: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });
        return { data, error };
    },

    signInWithApple: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'apple',
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });
        return { data, error };
    },

    getCurrentUser: async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        return { user, error };
    }
};

// Profile helper functions
export const profileHelpers = {
    createProfile: async (profile: Partial<Profile>) => {
        const { data, error } = await supabase
            .from('profiles')
            .insert(profile)
            .select()
            .single();
        return { data, error };
    },

    getProfile: async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
        return { data, error };
    },

    updateProfile: async (userId: string, updates: Partial<Profile>) => {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('user_id', userId)
            .select()
            .single();
        return { data, error };
    },

    getDiscoveryProfiles: async (userId: string, limit = 20) => {
        // Get profiles that match user preferences
        // Exclude already swiped profiles
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .neq('user_id', userId)
            .eq('verified', true)
            .limit(limit);
        return { data, error };
    }
};

// Match helper functions
export const matchHelpers = {
    createMatch: async (user1Id: string, user2Id: string) => {
        const { data, error } = await supabase
            .from('matches')
            .insert({ user1_id: user1Id, user2_id: user2Id })
            .select()
            .single();
        return { data, error };
    },

    getMatches: async (userId: string) => {
        const { data, error } = await supabase
            .from('matches')
            .select('*, profiles!matches_user2_id_fkey(*)')
            .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);
        return { data, error };
    }
};

// Message helper functions
export const messageHelpers = {
    sendMessage: async (message: Partial<Message>) => {
        const { data, error } = await supabase
            .from('messages')
            .insert(message)
            .select()
            .single();
        return { data, error };
    },

    getConversation: async (conversationId: string) => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });
        return { data, error };
    },

    subscribeToMessages: (conversationId: string, callback: (message: Message) => void) => {
        return supabase
            .channel(`messages:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`
                },
                (payload) => callback(payload.new as Message)
            )
            .subscribe();
    }
};
// Stat helper functions
export const statsHelpers = {
    getAppStats: async () => {
        // Get total verified profiles
        const { count: userCount, error: userError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('verified', true);

        // Get total matches
        const { count: matchCount, error: matchError } = await supabase
            .from('matches')
            .select('*', { count: 'exact', head: true });

        // Get active users (updated in last 15 minutes) - Approximate
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
        const { count: activeCount, error: activeError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .gte('updated_at', fifteenMinsAgo);

        return {
            totalUsers: userCount || 0,
            totalMatches: matchCount || 0,
            activeNow: activeCount || 0,
            error: userError || matchError || activeError
        };
    }
};
