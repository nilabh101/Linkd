-- Linkd Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table
CREATE TABLE profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  gender TEXT NOT NULL,
  bio TEXT,
  photos TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  prompts JSONB DEFAULT '[]',
  job TEXT,
  verified BOOLEAN DEFAULT FALSE,
  premium BOOLEAN DEFAULT FALSE,
  location JSONB,
  preferences JSONB DEFAULT '{"ageRange": [18, 100], "distance": 50, "genderPreference": []}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Swipes Table (track user swipes)
CREATE TABLE swipes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  swiper_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  swiped_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('left', 'right', 'super')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(swiper_id, swiped_id)
);

-- Matches Table
CREATE TABLE matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user1_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user1_id, user2_id),
  CHECK (user1_id < user2_id)
);

-- Conversations Table
CREATE TABLE conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE UNIQUE NOT NULL,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  type TEXT NOT NULL CHECK (type IN ('text', 'photo', 'video', 'voice')),
  media_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Picks Table
CREATE TABLE daily_picks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  picked_user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  pick_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, picked_user_id, pick_date)
);

-- Indexes for performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_swipes_swiper_id ON swipes(swiper_id);
CREATE INDEX idx_swipes_swiped_id ON swipes(swiped_id);
CREATE INDEX idx_matches_user1_id ON matches(user1_id);
CREATE INDEX idx_matches_user2_id ON matches(user2_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_daily_picks_user_id ON daily_picks(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_picks ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view verified profiles"
  ON profiles FOR SELECT
  USING (verified = TRUE OR user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Swipes Policies
CREATE POLICY "Users can view own swipes"
  ON swipes FOR SELECT
  USING (swiper_id = auth.uid());

CREATE POLICY "Users can insert own swipes"
  ON swipes FOR INSERT
  WITH CHECK (swiper_id = auth.uid());

-- Matches Policies
CREATE POLICY "Users can view own matches"
  ON matches FOR SELECT
  USING (user1_id = auth.uid() OR user2_id = auth.uid());

CREATE POLICY "System can insert matches"
  ON matches FOR INSERT
  WITH CHECK (TRUE);

-- Messages Policies
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      JOIN matches m ON c.match_id = m.id
      WHERE c.id = messages.conversation_id
      AND (m.user1_id = auth.uid() OR m.user2_id = auth.uid())
    )
  );

CREATE POLICY "Users can insert messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

-- Daily Picks Policies
CREATE POLICY "Users can view own daily picks"
  ON daily_picks FOR SELECT
  USING (user_id = auth.uid());

-- Functions
CREATE OR REPLACE FUNCTION check_mutual_like()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if there's a mutual like (both users swiped right)
  IF NEW.direction = 'right' AND EXISTS (
    SELECT 1 FROM swipes
    WHERE swiper_id = NEW.swiped_id
    AND swiped_id = NEW.swiper_id
    AND direction IN ('right', 'super')
  ) THEN
    -- Create match (ensure user1_id < user2_id for unique constraint)
    INSERT INTO matches (user1_id, user2_id)
    VALUES (
      LEAST(NEW.swiper_id, NEW.swiped_id),
      GREATEST(NEW.swiper_id, NEW.swiped_id)
    )
    ON CONFLICT DO NOTHING;
    
    -- Create conversation
    INSERT INTO conversations (match_id)
    SELECT id FROM matches
    WHERE (user1_id = LEAST(NEW.swiper_id, NEW.swiped_id)
    AND user2_id = GREATEST(NEW.swiper_id, NEW.swiped_id))
    ON CONFLICT DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic match creation
CREATE TRIGGER on_swipe_check_match
  AFTER INSERT ON swipes
  FOR EACH ROW
  EXECUTE FUNCTION check_mutual_like();

-- Function to update conversation last_activity
CREATE OR REPLACE FUNCTION update_conversation_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET last_activity = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update conversation activity on new message
CREATE TRIGGER on_message_update_activity
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_activity();
