# Supabase Setup Guide for Linkd

This guide will help you set up Supabase for production use with Linkd.

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email

## Step 2: Create New Project

1. Click "New Project"
2. Fill in details:
   - **Name**: `linkd-production`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with Free tier
3. Wait ~2 minutes for project to initialize

## Step 3: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "+ New Query"
3. Copy the **entire contents** of `supabase-schema.sql` from your project root
4. Paste into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. ✅ You should see "Success. No rows returned"

This creates all tables, indexes, RLS policies, and triggers.

## Step 4: Get API Credentials

1. In Supabase dashboard, click **Settings** (gear icon, bottom left)
2. Click **API** in the left menu
3. Copy these two values:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **anon public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Step 5: Configure Linkd App

1. In your Linkd project root, create `.env.local` file:

```bash
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Replace with your actual URL and key from Step 4

3. **Important**: Make sure `.env.local` is in `.gitignore`!

## Step 6: Enable OAuth (Optional but Recommended)

### Google Sign-In

1. Go to **Authentication** → **Providers** in Supabase
2. Find "Google" and click to expand
3. Toggle **Enable Google**
4. You'll need:
   - Google Cloud Project with OAuth consent screen configured
   - OAuth 2.0 Client ID

**To create Google OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click "+ CREATE CREDENTIALS" → "OAuth 2.0 Client ID"
5. Application type: **Web application**
6. Add authorized redirect URI:
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
   (Replace with your Supabase project URL)
7. Copy **Client ID** and **Client Secret**
8. Paste into Supabase Google provider settings
9. Click **Save**

### Apple Sign-In

1. Go to **Authentication** → **Providers** in Supabase
2. Find "Apple" and click to expand
3. Toggle **Enable Apple**
4. You'll need:
   - Apple Developer Account ($99/year)
   - Services ID
   - Team ID
   - Key ID
   - Private Key

**To create Apple Sign-In:**
1. Go to [Apple Developer Portal](https://developer.apple.com)
2. **Certificates, IDs & Profiles** → **Identifiers**
3. Create new **App ID**
4. Create new **Services ID**
5. Configure Sign In with Apple capability
6. Add redirect URL:
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
7. Create a new **Key** for Sign In with Apple
8. Copy all IDs and paste into Supabase Apple provider settings

## Step 7: Test the Connection

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Open browser console (F12)

3. Check if Supabase client initializes without errors

4. Try signing up a test user:
   - Go to http://localhost:5173
   - Click "Start Your Journey"
   - Enter email and password
   - Check Supabase dashboard → **Authentication** → **Users**
   - You should see your new user!

## Step 8: Verify Database

1. In Supabase, go to **Table Editor**
2. You should see these tables:
   - profiles
   - swipes
   - matches
   - conversations
   - messages
   - daily_picks

3. Click on **profiles** table
4. After onboarding, you should see your profile data here

## Security Checklist

- [x] Database schema created
- [ ] `.env.local` is in `.gitignore`
- [ ] Never commit API keys to Git
- [ ] RLS policies enabled (already in schema)
- [ ] OAuth providers configured (if using)
- [ ] Test user created successfully

## Troubleshooting

### "Failed to fetch" errors
- Check that `VITE_SUPABASE_URL` is correct
- Verify anon key is properly set
- Check browser console for CORS errors

### OAuth not working
- Verify redirect URLs match exactly (http vs https, trailing slash, etc.)
- Check Client ID/Secret are correct
- Test with incognito mode

### Database errors
- Check RLS policies (might be blocking legitimate requests)
- Verify user roles and permissions
- Look at Supabase logs in dashboard

## Next Steps

Once Supabase is set up:
1. Auth will work with real accounts
2. Profiles will save to database
3. Matches and messages will be real-time
4. Gender filtering will work based on preferences

Ready to go live! 🚀
