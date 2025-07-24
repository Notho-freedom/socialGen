-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('linkedin', 'twitter', 'instagram', 'facebook', 'tiktok')),
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
    image_url TEXT,
    prompt TEXT,
    objective VARCHAR(255),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_platform ON posts(platform);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_scheduled_at ON posts(scheduled_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert demo user
INSERT INTO user_profiles (id, email, full_name) 
VALUES ('demo-user-id', 'demo@socialgen.ai', 'Demo User')
ON CONFLICT (email) DO NOTHING;

-- Insert demo posts
INSERT INTO posts (user_id, title, content, platform, status, image_url, prompt, objective, created_at) VALUES
('demo-user-id', 'Conseils productivité pour entrepreneurs', '🚀 5 conseils pour booster votre productivité en tant qu''entrepreneur :

1️⃣ Planifiez votre journée la veille
2️⃣ Utilisez la technique Pomodoro
3️⃣ Éliminez les distractions
4️⃣ Déléguez les tâches non-essentielles
5️⃣ Prenez des pauses régulières

Quel est votre conseil préféré ? 💬

#Productivité #Entrepreneur #Conseils', 'linkedin', 'published', '/placeholder.svg?height=300&width=500&text=Productivity', 'Créer un post sur la productivité pour entrepreneurs', 'Conseils d''expert', NOW() - INTERVAL '2 hours'),

('demo-user-id', 'Thread marketing digital 2024', '🧵 THREAD : Les 10 tendances marketing digital à suivre en 2024

1/ L''IA générative révolutionne la création de contenu
2/ Le marketing conversationnel explose
3/ Les micro-influenceurs dominent

[Thread de 10 tweets]', 'twitter', 'published', NULL, 'Thread sur les tendances marketing 2024', 'Tendances du secteur', NOW() - INTERVAL '6 hours'),

('demo-user-id', 'Post motivant du lundi', '💪 Nouveau lundi, nouvelles opportunités !

Cette semaine, fixez-vous un objectif qui vous fait vibrer. Peu importe sa taille, l''important c''est de commencer.

✨ Rappel du jour :
• Chaque expert a été un débutant
• Chaque succès a commencé par un premier pas
• Chaque rêve mérite sa chance

Alors, quel sera votre premier pas aujourd''hui ? 👇

#Motivation #Lundi #Objectifs #Réussite', 'instagram', 'scheduled', '/placeholder.svg?height=300&width=300&text=Monday+Motivation', 'Post motivant pour le lundi', 'Post du lundi motivant', NOW() - INTERVAL '1 day')

ON CONFLICT DO NOTHING;
