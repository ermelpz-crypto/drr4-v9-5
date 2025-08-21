# Authentication Setup Guide

## Problem Analysis

The "Invalid login credentials" error occurs because:

1. **No users exist in Supabase Auth** - The database has sample data but no actual user accounts
2. **Environment variables may not be configured** - Supabase connection might not be properly set up
3. **Email confirmation is enabled** - Supabase may require email confirmation by default

## Solution Steps

### Step 1: Set Up Supabase Project

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your credentials**:
   - Go to Settings → API
   - Copy your Project URL and anon/public key
3. **Update your `.env` file**:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 2: Run Database Migrations

1. **Go to your Supabase Dashboard**
2. **Navigate to SQL Editor**
3. **Run each migration file** in order:
   - Copy content from `supabase/migrations/20250819112821_proud_resonance.sql`
   - Paste and run in SQL Editor
   - Run the new `create_demo_users.sql` migration

### Step 3: Configure Authentication Settings

1. **Go to Authentication → Settings** in Supabase Dashboard
2. **Disable email confirmation**:
   - Uncheck "Enable email confirmations"
   - This allows immediate login without email verification
3. **Set Site URL** (if needed):
   - Add your development URL: `http://localhost:5173`

### Step 4: Create Demo Users

**Option A: Use the Migration (Recommended)**
- The `create_demo_users.sql` migration creates demo users automatically

**Option B: Manual Creation in Supabase Dashboard**
1. Go to **Authentication → Users**
2. Click **"Add User"**
3. Create admin user:
   - Email: `admin@mdrrmo.gov.ph`
   - Password: `admin123`
   - User Metadata:
     ```json
     {
       "role": "admin",
       "name": "MDRRMO Administrator"
     }
     ```
4. Create editor user:
   - Email: `editor@mdrrmo.gov.ph`
   - Password: `editor123`
   - User Metadata:
     ```json
     {
       "role": "editor",
       "name": "MDRRMO Editor"
     }
     ```

### Step 5: Test Login

1. **Start the development server**: `npm run dev`
2. **Navigate to**: `http://localhost:5173/admin/login`
3. **Try logging in with**:
   - **Admin**: `admin@mdrrmo.gov.ph` / `admin123`
   - **Editor**: `editor@mdrrmo.gov.ph` / `editor123`

## Troubleshooting

### If you still can't login:

1. **Check browser console** for detailed error messages
2. **Verify environment variables** are loaded correctly
3. **Check Supabase Dashboard**:
   - Go to Authentication → Users
   - Verify users exist and are confirmed
4. **Try creating a user manually** in Supabase Dashboard
5. **Check Authentication settings**:
   - Ensure email confirmation is disabled
   - Verify no additional security rules are blocking login

### Common Issues:

- **"Email not confirmed"**: Disable email confirmation in Auth settings
- **"User not found"**: Create users manually in Supabase Dashboard
- **"Invalid credentials"**: Double-check email/password combination
- **Connection errors**: Verify environment variables and Supabase project status

### Environment Variables Check:

The system now logs Supabase configuration on startup. Check the browser console for:
```
Supabase configuration: {
  url: 'Set',
  key: 'Set', 
  urlValue: 'https://your-project...'
}
```

If you see "Missing" values, update your `.env` file.

## Production Notes

- **Change default passwords** before deploying to production
- **Enable email confirmation** for production use
- **Set up proper user management** workflows
- **Configure rate limiting** and security measures
- **Use strong passwords** and consider 2FA

## Demo Credentials

For immediate testing:
- **Admin**: admin@mdrrmo.gov.ph / admin123
- **Editor**: editor@mdrrmo.gov.ph / editor123

These credentials are now displayed on the login page for convenience during development.