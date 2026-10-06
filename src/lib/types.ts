export interface Service {
  id: string;
  slug: string;
  icon: string;
  name: string;
  short_description: string;
  long_description: string;
  price_label: string | null;
  features: string[];
  sort_order: number;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  tech: string;
  image_url: string;
  link: string;
  badge_color: string;
  sort_order: number;
}

export interface SiteConfig {
  id: string;
  brand_name: string;
  tagline: string;
  logo_url: string | null;
  email: string;
  phone: string;
  location: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  whatsapp: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  status: string;
  created_at: string;
}
