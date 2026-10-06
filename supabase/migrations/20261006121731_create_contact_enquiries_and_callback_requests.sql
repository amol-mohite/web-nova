/*
# Create contact_enquiries and callback_requests tables

1. New Tables
- `contact_enquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `phone` (text, nullable)
  - `message` (text, not null)
  - `status` (text, not null, default 'new')
  - `created_at` (timestamptz, default now())
- `callback_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `phone` (text, not null)
  - `status` (text, not null, default 'new')
  - `created_at` (timestamptz, default now())

2. Security
- RLS enabled on both tables.
- Public users (anon) can INSERT only — no SELECT, UPDATE, or DELETE.
- No authenticated role access needed (no sign-in screen).
*/

CREATE TABLE IF NOT EXISTS contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_enquiries" ON contact_enquiries;
CREATE POLICY "anon_insert_contact_enquiries"
ON contact_enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact_enquiries" ON contact_enquiries;
DROP POLICY IF EXISTS "anon_update_contact_enquiries" ON contact_enquiries;
DROP POLICY IF EXISTS "anon_delete_contact_enquiries" ON contact_enquiries;

CREATE TABLE IF NOT EXISTS callback_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE callback_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_callback_requests" ON callback_requests;
CREATE POLICY "anon_insert_callback_requests"
ON callback_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_callback_requests" ON callback_requests;
DROP POLICY IF EXISTS "anon_update_callback_requests" ON callback_requests;
DROP POLICY IF EXISTS "anon_delete_callback_requests" ON callback_requests;