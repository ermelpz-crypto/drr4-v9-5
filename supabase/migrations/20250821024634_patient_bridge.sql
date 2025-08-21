/*
  # Create Demo Users for MDRRMO System

  1. New Tables
    - Ensure auth.users table has demo users
    - Create user profiles in public.users table

  2. Demo Users
    - Admin user: admin@mdrrmo.gov.ph / admin123
    - Editor user: editor@mdrrmo.gov.ph / editor123

  3. Security
    - Proper user metadata setup
    - Role-based access control
*/

-- Insert demo users into auth.users (Supabase Auth)
-- Note: In production, users should be created through Supabase Dashboard or Auth API

-- Create demo admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@mdrrmo.gov.ph',
  crypt('admin123', gen_salt('bf')),
  now(),
  null,
  null,
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin", "name": "MDRRMO Administrator"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create demo editor user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'editor@mdrrmo.gov.ph',
  crypt('editor123', gen_salt('bf')),
  now(),
  null,
  null,
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "editor", "name": "MDRRMO Editor"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create corresponding profiles in public.users table
INSERT INTO public.users (
  id,
  username,
  email,
  password_hash,
  role,
  name,
  status,
  last_login
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@mdrrmo.gov.ph'),
  'admin',
  'admin@mdrrmo.gov.ph',
  crypt('admin123', gen_salt('bf')),
  'admin',
  'MDRRMO Administrator',
  'active',
  now()
) ON CONFLICT (email) DO UPDATE SET
  role = EXCLUDED.role,
  name = EXCLUDED.name,
  status = EXCLUDED.status;

INSERT INTO public.users (
  id,
  username,
  email,
  password_hash,
  role,
  name,
  status,
  last_login
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'editor@mdrrmo.gov.ph'),
  'editor',
  'editor@mdrrmo.gov.ph',
  crypt('editor123', gen_salt('bf')),
  'editor',
  'MDRRMO Editor',
  'active',
  now()
) ON CONFLICT (email) DO UPDATE SET
  role = EXCLUDED.role,
  name = EXCLUDED.name,
  status = EXCLUDED.status;

-- Verify users were created
DO $$
DECLARE
    admin_count integer;
    editor_count integer;
BEGIN
    SELECT COUNT(*) INTO admin_count FROM auth.users WHERE email = 'admin@mdrrmo.gov.ph';
    SELECT COUNT(*) INTO editor_count FROM auth.users WHERE email = 'editor@mdrrmo.gov.ph';
    
    IF admin_count > 0 AND editor_count > 0 THEN
        RAISE NOTICE 'Demo users created successfully:';
        RAISE NOTICE 'Admin: admin@mdrrmo.gov.ph / admin123';
        RAISE NOTICE 'Editor: editor@mdrrmo.gov.ph / editor123';
    ELSE
        RAISE WARNING 'Failed to create demo users. Please create them manually in Supabase Dashboard.';
    END IF;
END $$;