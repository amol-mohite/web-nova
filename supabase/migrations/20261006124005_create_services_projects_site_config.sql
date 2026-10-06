/*
# Create services, projects, and site_config tables for admin-managed content

1. New Tables
- `services` — editable service catalog shown on homepage and services page
  - id, slug, icon, name, short_description, long_description, price_label, features (jsonb), sort_order, created_at, updated_at
- `projects` — portfolio/work items
  - id, name, category, description, tech, image_url, link, badge_color, sort_order, created_at
- `site_config` — single-row brand/contact/social config
  - id, brand_name, tagline, email, phone, location, instagram, linkedin, facebook, whatsapp, created_at, updated_at

2. Security
- RLS enabled on all three tables.
- Public (anon) can SELECT all three — content is public.
- Only authenticated users can INSERT, UPDATE, DELETE (admin panel).
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  icon text NOT NULL DEFAULT 'Code2',
  name text NOT NULL,
  short_description text NOT NULL,
  long_description text NOT NULL DEFAULT '',
  price_label text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_services" ON services;
CREATE POLICY "anon_select_services" ON services FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_services" ON services;
CREATE POLICY "auth_insert_services" ON services FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_services" ON services;
CREATE POLICY "auth_update_services" ON services FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_services" ON services;
CREATE POLICY "auth_delete_services" ON services FOR DELETE
TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  tech text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  link text NOT NULL DEFAULT '#',
  badge_color text NOT NULL DEFAULT 'teal',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_projects" ON projects;
CREATE POLICY "auth_insert_projects" ON projects FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_projects" ON projects;
CREATE POLICY "auth_update_projects" ON projects FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_projects" ON projects;
CREATE POLICY "auth_delete_projects" ON projects FOR DELETE
TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name text NOT NULL DEFAULT 'Lumen Studio',
  tagline text NOT NULL DEFAULT 'Fast websites. Clear scope. Better digital experiences.',
  email text NOT NULL DEFAULT 'hello@lumenstudio.dev',
  phone text NOT NULL DEFAULT '+91 98765 43210',
  location text NOT NULL DEFAULT 'Pune, India',
  instagram text NOT NULL DEFAULT 'https://instagram.com',
  linkedin text NOT NULL DEFAULT 'https://linkedin.com',
  facebook text NOT NULL DEFAULT 'https://facebook.com',
  whatsapp text NOT NULL DEFAULT 'https://wa.me/919876543210',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_site_config" ON site_config;
CREATE POLICY "anon_select_site_config" ON site_config FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_site_config" ON site_config;
CREATE POLICY "auth_insert_site_config" ON site_config FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_site_config" ON site_config;
CREATE POLICY "auth_update_site_config" ON site_config FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_site_config" ON site_config;
CREATE POLICY "auth_delete_site_config" ON site_config FOR DELETE
TO authenticated USING (true);

-- Seed services
INSERT INTO services (slug, icon, name, short_description, long_description, price_label, features, sort_order) VALUES
('corporate-websites', 'Building2', 'Corporate Websites',
  'Professional, responsive websites designed to establish trust and help your business get found online.',
  'A corporate website is often the first impression your business makes. We build clean, fast, professional websites that communicate credibility, showcase your services, and make it easy for customers to reach you. Every site is responsive, SEO-optimized, and built on a solid technical foundation.',
  'Starting from ₹4,999',
  jsonb_build_array('Custom professional UI design','Responsive across mobile, tablet & desktop','Development & deployment included','1 year of support & maintenance','Domain setup assistance','On-page SEO optimization','Contact form integration','Google Analytics setup'),
  1),
('e-commerce', 'ShoppingCart', 'E-commerce',
  'WooCommerce, Shopify or fully custom storefronts built around your products and workflow.',
  'Sell your products online with a store that matches your brand and workflow. Whether you need WooCommerce, Shopify, or a fully custom e-commerce build, we handle product catalog setup, payment gateway integration, order management, and a smooth checkout experience that converts.',
  NULL,
  jsonb_build_array('Custom storefront design','Product catalog setup','Payment gateway integration','Cart & checkout optimization','Responsive mobile shopping','Order management dashboard','Inventory sync','1 year of support'),
  2),
('landing-pages', 'Rocket', 'Landing Pages',
  'Focused landing pages for campaigns, products, services and lead generation.',
  'A landing page has one job: convert visitors into leads or customers. We build focused, high-converting landing pages that load fast, look sharp, and drive action. Perfect for ad campaigns, product launches, event registrations, or lead capture.',
  NULL,
  jsonb_build_array('Conversion-focused design','Fast load times','Lead capture form','A/B test ready','Responsive design','Analytics & tracking','Campaign integration','1 year of support'),
  3),
('web-apps-pwas', 'Smartphone', 'Web Apps & PWAs',
  'Fast, app-like web experiences built for desktop and mobile users.',
  'Progressive Web Apps combine the reach of the web with the feel of a native app. We build fast, installable, offline-capable web applications that work across desktop and mobile — with smooth interactions, real-time data, and app-like navigation.',
  NULL,
  jsonb_build_array('App-like UX design','Offline capability','Push notifications','Real-time data sync','Database integration','Authentication system','Installable on mobile','1 year of support'),
  4),
('custom-development', 'Code2', 'Custom Development',
  'Custom features, dashboards, integrations and business workflows when off-the-shelf solutions are not enough.',
  'When off-the-shelf tools do not fit your workflow, we build custom. From internal dashboards and admin panels to API integrations and automated business processes, we develop tailored solutions that solve your specific problems and scale with your growth.',
  NULL,
  jsonb_build_array('Custom architecture design','Dashboard & admin panel','API integrations','Database design & setup','User authentication','Role-based access control','Automated workflows','1 year of support'),
  5)
ON CONFLICT (slug) DO NOTHING;

-- Seed projects
INSERT INTO projects (name, category, description, tech, image_url, link, badge_color, sort_order) VALUES
('Aditium Trades', 'Export / Import',
  'Premium B2B export company website with product discovery and enquiry experience.',
  'Corporate Website',
  'https://images.pexels.com/photos/461073/pexels-photo-461073.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://aditiumtrades.com', 'teal', 1),
('Rasila Juice Center', 'Food & Beverage',
  'Fresh, local juice ordering experience with product discovery and WhatsApp ordering.',
  'E-commerce',
  'https://images.pexels.com/photos/8215110/pexels-photo-8215110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://rasilajuice.com', 'orange', 2),
('Rajmudra Pratishthan', 'Community / Non-profit',
  'Community organization website with events, initiatives and social engagement.',
  'Web App',
  'https://images.pexels.com/photos/24864209/pexels-photo-24864209.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://rajmudra.org', 'pink', 3)
ON CONFLICT DO NOTHING;

-- Seed site_config
INSERT INTO site_config (brand_name, tagline, email, phone, location, instagram, linkedin, facebook, whatsapp)
SELECT 'Lumen Studio', 'Fast websites. Clear scope. Better digital experiences.', 'hello@lumenstudio.dev', '+91 98765 43210', 'Pune, India', 'https://instagram.com', 'https://linkedin.com', 'https://facebook.com', 'https://wa.me/919876543210'
WHERE NOT EXISTS (SELECT 1 FROM site_config);