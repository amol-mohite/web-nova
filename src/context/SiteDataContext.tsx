import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Service, Project, SiteConfig } from '@/lib/types';

interface SiteDataValue {
  services: Service[];
  projects: Project[];
  config: SiteConfig | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const defaultConfig: SiteConfig = {
  id: '',
  brand_name: 'Lumen Studio',
  tagline: 'Fast websites. Clear scope. Better digital experiences.',
  logo_url: null,
  email: 'hello@lumenstudio.dev',
  phone: '+91 98765 43210',
  location: 'Pune, India',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  facebook: 'https://facebook.com',
  whatsapp: 'https://wa.me/919876543210',
};

const SiteDataContext = createContext<SiteDataValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const [svcRes, projRes, cfgRes] = await Promise.all([
      supabase.from('services').select('*').order('sort_order', { ascending: true }),
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_config').select('*').limit(1).maybeSingle(),
    ]);

    if (svcRes.data) setServices(svcRes.data as Service[]);
    if (projRes.data) setProjects(projRes.data as Project[]);
    setConfig((cfgRes.data as SiteConfig) ?? defaultConfig);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SiteDataContext.Provider value={{ services, projects, config, loading, refresh }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider');
  return ctx;
}
