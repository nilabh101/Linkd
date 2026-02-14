# Linkd - Deployment Guide

## 🚀 Production Deployment with Supabase

This guide will help you deploy Linkd to production with a real Supabase backend.

---

## Prerequisites

- Node.js 18+ installed  
- A Supabase account ([supabase.com](https://supabase.com))
- Vercel, Netlify, or similar hosting account (optional)

---

## Step 1: Set Up Supabase

### 1.1 Create a New Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in:
   - **Project Name**: `linkd-production`
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
4. Wait for the project to be ready (~2 minutes)

### 1.2 Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from your project root
4. Paste and click "Run"
5. ✅ This creates all tables, indexes, RLS policies, and triggers

### 1.3 Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key

---

## Step 2: Configure Environment Variables

### 2.1 Create `.env.local`

In your project root, create `.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> **⚠️ Important**: Never commit `.env.local` to Git!

### 2.2 Add `.env.local` to `.gitignore`

Make sure your `.gitignore` includes:
```
.env.local
.env
```

---

## Step 3: Set Up OAuth (Optional but Recommended)

### 3.1 Google Sign-In

1. In Supabase dashboard → **Authentication** → **Providers**
2. Enable **Google**
3. Follow the setup guide: [Supabase Google Auth Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
4. Add your **Client ID** and **Client Secret**

### 3.2 Apple Sign-In

1. In Supabase dashboard → **Authentication** → **Providers**
2. Enable **Apple**
3. Follow the setup guide: [Supabase Apple Auth Guide](https://supabase.com/docs/guides/auth/social-login/auth-apple)
4. Add your **Services ID** and **Key ID**

---

## Step 4: Build and Test Locally

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

---

## Step 5: Deploy to Production

### Option A: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Option B: Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables in **Site settings** → **Environment variables**
6. Deploy

### Option C: Manual Deployment

```bash
# Build the app
npm run build

# The dist/ folder is ready to deploy
# Upload to any static hosting (AWS S3, Cloudflare Pages, etc.)
```

---

## Step 6: Configure Redirect URLs

After deployment, update your Supabase redirect URLs:

1. In Supabase → **Authentication** → **URL Configuration**
2. Add your production URL to **Redirect URLs**:
   ```
   https://your-app.vercel.app/dashboard
   https://your-app.vercel.app/onboarding
   ```

---

## Step 7: Enable Storage (for Photo Uploads)

### 7.1 Create Storage Bucket

1. In Supabase → **Storage**
2. Create a new bucket: `profile-photos`
3. Make it **Public** if you want photos visible without auth

### 7.2 Set Up Storage Policies

```sql
-- Allow authenticated users to upload photos
CREATE POLICY "Users can upload photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'profile-photos');

-- Allow public read access
CREATE POLICY "Public can view photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-photos');
```

---

## Security Checklist

- ✅ RLS (Row Level Security) is enabled on all tables
- ✅ `.env.local` is not committed to Git
- ✅ OAuth providers are configured with correct redirect URLs
- ✅ API keys are added to hosting platform environment variables
- ✅ Storage policies are set up correctly
- ✅ Email confirmation is enabled (optional but recommended)

---

## Monitoring & Analytics

### Enable Supabase Monitoring

1. Go to **Reports** in Supabase dashboard
2. Monitor:
   - Active users
   - Database performance
   - API requests
   - Storage usage

### Optional: Add Analytics

Consider adding:
- [PostHog](https://posthog.com) for product analytics
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay

---

## Production Optimizations

1. **Enable CDN**: Use Cloudflare or similar
2. **Image Optimization**: Use Supabase Image Transformation
3. **Database Indexes**: Already included in schema
4. **Caching**: Add Redis for real-time features (optional)
5. **Rate Limiting**: Implement in Supabase Edge Functions

---

## Troubleshooting

### "Failed to fetch" errors

- Check that `VITE_SUPABASE_URL` is correct
- Verify API keys are properly set
- Check browser console for CORS errors

### OAuth not working

- Verify redirect URLs in both Supabase and OAuth provider
- Check that Client ID/Secret are correct
- Test with incognito mode

### Database connection issues

- Check RLS policies (might be blocking legitimate requests)
- Verify user roles and permissions
- Look at Supabase logs in the dashboard

---

## Next Steps

- [ ] Set up email templates in Supabase Auth
- [ ] Configure push notifications (optional)
- [ ] Implement SMS verification (optional)
- [ ] Add payment processing for premium subscriptions
- [ ] Set up content moderation
- [ ] Create admin panel

---

## Support

For issues:
1. Check Supabase documentation
2. Review the SQL schema in `supabase-schema.sql`
3. Check helper functions in `src/lib/supabase.ts`

## License

This is a prototype application. Review all security settings before production use.
